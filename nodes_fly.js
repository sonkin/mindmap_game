let completelyAssembledMindMap = false;
 // this is a scale for taskNode set in flyNodeToMiddle()
let taskNodeFlyingUpScale = pageWidth/500;

function createTaskNodes(nodes) {
  taskNodes.forEach((node, index) => {
    const div = document.createElement('div');
    div.className = 'fallingTaskText unsolved';
    div.textContent = node;

    document.getElementById("fallNodesContainer").appendChild(div);
  });
}

function goodJobDone() {
  completelyAssembledMindMap = true;
  const appRect = document.getElementById("app").getBoundingClientRect();
  const goodJob = document.getElementById("goodJob");
  goodJob.style.display = "inline-block";
  goodJob.style.opacity = "0.8";
  goodJob.style.top = scale*appRect.bottom + "px";
}

// select node to be the next task
function flyNodeToMiddle() {
    const container = document.getElementById('fallNodesContainer');
    const nodes = container.querySelectorAll('.fallingTaskText.unsolved');
    if (nodes.length === 0) {
      goodJobDone();
      return;
    };
  
    const randomIndex = Math.floor(Math.random() * nodes.length);
    const node = nodes[randomIndex];
    const nodeRect = node.getBoundingClientRect();

    flyingNode = node.cloneNode(true);
    document.body.appendChild(flyingNode);

    flyingNode.classList.add("flyingNode");
    flyingNode.style.left = `${nodeRect.left}px`;
    flyingNode.style.bottom = `${window.innerHeight - nodeRect.bottom}px`;
    
    window.taskNode = flyingNode;

    // scale is 1 because we didn't scale taskNode before now
    // (just create a clone of not-scaled node)
    const endPosition = getFlyingNodeEndPosition(flyingNode, 1); 
    node.style.opacity = '0.2'; // make old node from heap semi-transparent
    node.classList.remove("unsolved");

    // fix for Safari: otherwise see blurry text
    //flyingNode.style.zoom = "99.99%";

    animateFlyingNode(flyingNode, endPosition);

    setTimeout(() => {
      //flyingNode.style.transform = 'scale(3)'
    }, 1000);
}
            

function animateFlyingNode(node, endPosition) {
  node.animate(
    [
      {
        left: `${Math.round(node.getBoundingClientRect().left)}px`,
        bottom: `${Math.round(window.innerHeight - node.getBoundingClientRect().bottom)}px`,
        opacity: 0.5,
      },
      {
        left: `${Math.round(endPosition.x)}px`,
        bottom: `${Math.round(window.innerHeight - endPosition.y)}px`,
        transform: `scale(${taskNodeFlyingUpScale})`,
        opacity: 1,
      },
    ],
    {
      duration: 1000,
      easing: 'ease-in',
      fill: 'forwards',
    }
  );
}

function cancelActiveAnimations(element) {
  const animations = element.getAnimations();
  for (const animation of animations) {
    animation.cancel();
  }
}

function getFlyingNodeEndPosition(node, currentFlyingNodeScale) {
  const appRect = document.getElementById("app").getBoundingClientRect();
  const mindmapRect = document.getElementById("mindmap").getBoundingClientRect();
  const nodeRect = node.getBoundingClientRect();

  const shiftFromWindowBottom = 20;
  const endPosition = {
    x: window.innerWidth / 2 - nodeRect.width / currentFlyingNodeScale / 2,
    y: appRect.bottom + nodeRect.height * taskNodeFlyingUpScale / 2,
  };
  // if flyingNode is under the visible part of the screen, make it upper
  if (
    endPosition.y +nodeRect.height / taskNodeFlyingUpScale 
      + shiftFromWindowBottom > window.innerHeight) 
  {
    endPosition.y = window.innerHeight - nodeRect.height / taskNodeFlyingUpScale - shiftFromWindowBottom;
  }
  return endPosition;
}

function updateNodePosition(node) {
  cancelActiveAnimations(node);
  flyingNode.style.transform = `scale(${taskNodeFlyingUpScale})`;
  const endPosition = getFlyingNodeEndPosition(flyingNode, taskNodeFlyingUpScale);

  flyingNode.style.left = Math.round(endPosition.x)+"px";
  flyingNode.style.bottom = Math.round(window.innerHeight - endPosition.y)+"px";
}

window.addEventListener("resize", () => {
  if (typeof flyingNode !== "undefined") updateNodePosition(flyingNode);
});

function flyTaskNodeToParentNode(node) {
    //const node = document.getElementById("taskNodeCandidate");
    const boundingBoxMindmap = mindmapObject.getBoundingClientRect();
    const topicShapeGroup = node.querySelector("g[data-name='topic-shape-group']")

    // get the position of the node (we use internal topic-shape-group)
    const boundingBox = topicShapeGroup.getBoundingClientRect();
    //const leftOffset = document.getElementById("mindmap").offsetLeft;
    const taskNodeNextScale = 1.5;
    const taskNodeBox = taskNode.getBoundingClientRect();
    const nodeCenter = boundingBox.left + (boundingBox.width / 2);
    const taskNodeCenter = taskNodeBox.width / 2 / taskNodeFlyingUpScale;
    const taskNodeHeight = taskNodeBox.height / taskNodeFlyingUpScale * taskNodeNextScale;
    const left = 
      parseInt((
        scale * nodeCenter 
        + boundingBoxMindmap.left
        - taskNodeCenter));
    const taskNodeShiftDown = boundingBox.height/2+10; // TODO: check 10
    const nodeTop = boundingBox.top + boundingBox.height;
    const bottom = window.innerHeight - 
      (parseInt(scale * nodeTop
        + boundingBoxMindmap.top
        + taskNodeShiftDown)
        + window.scrollY); // Add the size of the arrow

    taskNode.animate([
    {
        left: left+"px", 
        bottom: bottom+"px", 
        top: "auto",
        transform: `scale(${taskNodeNextScale})`,
        backgroundColor: node.getAttribute("color"),
        opacity: 1,
    }
    ],{
        duration: 1000,
        easing: 'ease-in',
        fill: 'forwards',
      });
      let dissolvingTaskNode = taskNode;
      setTimeout(()=>{
        dissolvingTaskNode.animate({opacity: 0},{duration: 3000});
        setTimeout(()=>document.body.removeChild(dissolvingTaskNode), 2800)
      }, 1000);

    // add the fly class to start the animation
    taskNode.classList.add("flyTaskNode");
  
    // remove the taskNode when the animation ends
    taskNode.addEventListener("animationend", function() {
      taskNode.remove();
    });
  }
  
  function fallNodesContainerInitAnimation() {
    document.getElementById("fallNodesContainer").style.bottom = "500px";
    document.getElementById("fallNodesContainer").style.height = "500px";
    document.getElementById("fallNodesContainer").animate([{
      bottom: "100px",
      height: "500px",
      opacity: 0,
    },
    {
      bottom: "0px",
      height: "0",
      opacity: isMobile?0.2:0.6
    }],{
      duration: 2000,
      easing: 'ease-in',
      fill: 'forwards',
      force3D: false,
    })
  }

