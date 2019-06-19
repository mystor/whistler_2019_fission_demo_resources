let info;

function log(msg) {
  let child = document.createElement("div");
  child.textContent = msg;
  info.appendChild(child);
}

function addControls(controls, frame) {
  let rot = document.createElement("button");
  rot.textContent = "rotate";
  rot.addEventListener("click", evt => {
    frame.classList.toggle("rotate");
    evt.preventDefault();
  });
  controls.appendChild(rot);

  let scale = document.createElement("button");
  scale.textContent = "scale";
  scale.addEventListener("click", evt => {
    frame.classList.toggle("scale");
    evt.preventDefault();
  });
  controls.appendChild(scale);

  let pm = document.createElement("button");
  pm.textContent = "postMessage";
  pm.addEventListener("click", evt => {
    frame.contentWindow.postMessage({message: "Message From " + location.href}, "*");
    evt.preventDefault();
  });
  controls.appendChild(pm);
}

addEventListener("message", evt => {
  log("Got message: " + JSON.stringify(evt.data));
});


addEventListener("load", _ => {
  info = document.querySelector("#info");
  if (!info) {
    return;
  }

  let pmout = document.createElement("button");
  pmout.textContent = "postMessage parent";
  pmout.addEventListener("click", evt => {
    parent.postMessage({message: "Message From " + location.href}, "*");
    evt.preventDefault();
  });
  info.appendChild(pmout);

  let pmtop = document.createElement("button");
  pmtop.textContent = "top";
  pmtop.addEventListener("click", evt => {
    top.postMessage({message: "Message From " + location.href}, "*");
    evt.preventDefault();
  });
  info.appendChild(pmtop);

  let href = document.createElement("div");
  href.textContent = window.location.href;
  info.appendChild(href);

  let frames = document.querySelectorAll("iframe");
  for (let frame of frames) {
    let controls = document.createElement("div");
    addControls(controls, frame);
    frame.parentElement.insertBefore(controls, frame);
  }
}, {once: true});



// HACKY HACKY HACK HACK HACK

addEventListener("beforeunload", _ => {
  let frames = document.querySelectorAll("iframe");
  for (let frame of frames) {
    frame.parentElement.removeChild(frame);
  }
});

