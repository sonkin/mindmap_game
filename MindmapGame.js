const quizId = 101;
const serverUri = `https://jquiz-athjd4btb4c0fadd.z01.azurefd.net/${quizId}/`;
// const serverUri = "http://localhost:9000/100/";
let nodesOrdered = 0;

function initGame(mindmapObject) {
  svgDocument = mindmapObject.contentDocument;
  const svg = svgDocument.querySelector("svg");
  svg.style.backgroundColor = "";
  assignHandlers();
}

const LRM = String.fromCodePoint(8206);
function findNodesByName(name) {
    return Array.from(svgDocument.querySelectorAll("g.topic")).filter(element => {
      return Array.from(element.querySelectorAll("*")).some(subElement => {
        const text = subElement.textContent.replaceAll("&lrm;", "").trim();
        const isVisible = window.getComputedStyle(element).display !== 'none';
        const cleanedTextWithoutLRM = text.replace(new RegExp(LRM, 'g'), '');
        return cleanedTextWithoutLRM === name && isVisible;
      });
    });
}

const findNodeByName = name => findNodesByName(name)[0];
  
const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

// Assign onclick, onmouseover and onmouseout handlers to nodes and subnodes
function assignHandlers() {
  Object.entries(allMindMapNodes).forEach(([nodeName, subnodes]) => {
    const node = findNodeByName(nodeName);
    node.onclick = function() {
      if (typeof taskNode === "undefined" || completelyAssembledMindMap) return;
      if (subnodes.indexOf(taskNode.textContent)>=0) {
        correct(node, nodeName);
      } else {
        incorrect();
      }
    };
    node.onmouseenter = function (event) {
      // highlight the parent element
      let shape = node.querySelector('path[data-name="topic-shape"]');
      const shapeStrokeColor = shape.getAttribute("stroke");
      shape.setAttribute("fill", shapeStrokeColor);
      node.setAttribute("oldColor", node.querySelector('tspan').style.fill);
      node.setAttribute("color", shapeStrokeColor);
      node.querySelector('tspan').style.fill = "white";
      if (isMobile) return;

      showPopover(node, nodeName);
      // after 2 sec delay, show all subnodes
      popoverTimeout2 = setTimeout(()=>showPopover(node, nodeName, true), 3000);
    };
          
    node.addEventListener("mouseup", ()=> {
      setTimeout(()=>{          
        let shape = node.querySelector('path[data-name="topic-shape"]');
        shape.setAttribute("fill","white");
        node.querySelector('tspan').style.fill=node.getAttribute("oldColor");
      }, 1000)
    });
    node.onmouseleave = function() {
      if (typeof popoverTimeout !== "undefined") {
        clearTimeout(popoverTimeout);
      }
      if (typeof popoverTimeout2 !== "undefined") {
        clearTimeout(popoverTimeout2);
      }
      let shape = node.querySelector('path[data-name="topic-shape"]');
      shape.setAttribute("fill","white");
      node.querySelector('tspan').style.fill=node.getAttribute("oldColor");
      // Hide the popover
      popover.style.display = "none";
    };
  });
}
// timeouts to show popover quickly and slowly after delay
let popoverTimeout, popoverTimeout2;

function showPopover(node, nodeName, showUnopened = false) {
  // show popover 
  const popover = document.getElementById("popover");

  const shapeStrokeColor = node.getAttribute("color");
  // Set the popover border color
  popover.style.setProperty('--popover-border-color', shapeStrokeColor);

  let nodeSubNodes = openedMindMapNodes[nodeName];
  if (showUnopened) nodeSubNodes = allMindMapNodes[nodeName];
  const popoverContents = document.getElementById("popover-content");

  // if nothing to show, exit
  if (!nodeSubNodes) {
    popover.style.display = "none";
    return;
  }
  
  // update popover contents 
  popoverContents.innerHTML = nodeSubNodes
    .map((subnode,i)=> `<div class="item">${subnode}</div>`).join("");

  // Get the bounding box of the <g> element
  const boundingBox = node.querySelector('path[data-name="topic-shape-fill"]').getBoundingClientRect();
  const boundingBoxMindmap = mindmapObject.getBoundingClientRect();

  // Get the absolute position (x, y) of the <g> element
  const posX = parseInt(scale * parseInt(boundingBox.left + boundingBox.width / 2) + boundingBoxMindmap.left + window.scrollX);
  const posY = parseInt(scale * parseInt(boundingBox.top + boundingBox.height) + boundingBoxMindmap.top + window.scrollY) + 20; // Add the size of the arrow

  // Position the popover
  popover.style.left = `${posX}px`;
  popover.style.top = `${posY}px`;
  popover.style.transform = 'translateX(-50%)';

  // Show the popover
  popoverTimeout = setTimeout(()=>{
    popover.style.display = "block";

    // Adjust the popover position to not exceed the viewport bounds
    const popoverRect = popover.getBoundingClientRect();

    let popoverLeft = posX;
    let popoverTop = posY;
    const popoverShift = 5; // popover shift from the window edge

    if (parseInt(popoverRect.right) > viewportWidth) {
      popoverLeft = posX - (popoverRect.right - viewportWidth) - popoverShift;
    } else if (popoverRect.left < 0) {
      popoverLeft = posX - popoverRect.left + popoverShift;
    }

    // Update the popover position
    popover.style.left = `${popoverLeft}px`;
    popover.style.top = `${popoverTop}px`;

    // Calculate the arrow position based on the target element's position
    const arrowOffset = posX - popoverLeft;
    const popoverArrow = popover.querySelector('.popover-arrow');
    popoverArrow.style.left = `calc(50% + ${arrowOffset}px)`;
  }, 1);
}

async function sendScoreToServer() {
  const totalNodes = taskNodes.length;
  const response = await fetch(serverUri + "users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "http://http://127.0.0.1:5500",
      //"Access-Control-Allow-Origin": "https://jmindmap.vercel.app/",
    },
    body: JSON.stringify({name:fullName, email, score, nodesOrdered, attempts, progress:Math.round(100*nodesOrdered/totalNodes)}),
  });
}

function correct(node, nodeName) {
  // Hide the popover after correct answer
  setTimeout(()=>popover.style.display = "none", 1);
  // create a new div element for the animation
  const div = document.createElement("div");
  div.className = "correct";
  div.innerHTML = `
    <span>CORRECT!</span>
    <span>👏👏👏</span>
  `;

  // append the div element to the body
  document.getElementById("svg-object-container").appendChild(div);

  div.classList.add('applaud');
  setTimeout(() => flyTaskNodeToParentNode(node), 100);

  // create a new div element for the animation
  const plusOneDiv = document.createElement("div");
  plusOneDiv.className = "minus-one plus-one";
  plusOneDiv.innerHTML = `<span>+1</span>`;
  document.getElementById("svg-object-container").appendChild(plusOneDiv);
  plusOneDiv.classList.add('plus-minus-fly');

  // plus-one need to fly right, but how far?
  const howFarToFlyRight = parseInt(100 * window.innerWidth
      / parseInt(getComputedStyle(plusOneDiv).width));
  plusOneDiv.style.setProperty("--minus-plus-translate", howFarToFlyRight+"%");

  addSubnodeToPopover(node, nodeName);
  nodesOrdered++;
  sendScoreToServer();
  
  // remove the div element after the animation is finished
  setTimeout(() => {
    div.remove();
    // show the task text
    //window.taskNode.remove();
    document.getElementById("score").classList.add("score-plus");
    updateScore(1);
    plusOneDiv.remove();

    //document.body.removeChild(taskNode);
    flyNodeToMiddle();
  }, 1500);
}

function addSubnodeToPopover(node, nodeName) {
  if (!openedMindMapNodes[nodeName]) openedMindMapNodes[nodeName] = [];
  openedMindMapNodes[nodeName].push(taskNode.textContent);
}

function incorrect() {
  // create a new div element for the animation
  const incorrectDiv = document.createElement("div");
  incorrectDiv.className = "incorrect";
  incorrectDiv.innerHTML = `
    <span>INCORRECT!</span>
    <span>😔</span>
  `;
  // append the div element to the body
  document.getElementById("svg-object-container").appendChild(incorrectDiv);
  incorrectDiv.classList.add('shake');

  // create a new div element for the animation
  const minusOneDiv = document.createElement("div");
  minusOneDiv.className = "minus-one";
  minusOneDiv.innerHTML = `<span>-1</span>`;

  document.getElementById("svg-object-container").appendChild(minusOneDiv);
  minusOneDiv.classList.add('plus-minus-fly');
  // minus-one need to fly right, but how far?
  const howFarToFlyRight = parseInt(100 * window.innerWidth
      / parseInt(getComputedStyle(minusOneDiv).width));
  minusOneDiv.style.setProperty("--minus-plus-translate", howFarToFlyRight+"%");

  // remove the div element after the animation is finished
  setTimeout(() => {
    incorrectDiv.remove();
    // show the task text
    setTimeout(() => {
      updateScore(-1);
      document.getElementById("score").classList.remove("score-plus");
      minusOneDiv.remove();
    }, 1000);
  }, 500);
}

let score = 0;

function updateScore(delta) {
  score += delta;
  const scoreElement = document.querySelector(".score");
  scoreElement.textContent = `Score: ${score}`;
}
