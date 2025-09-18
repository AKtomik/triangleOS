let isSwiped = false;


function swipe_checker() {
  if (window.location.hash === "#folio") {
    swipe_to_one();
  }
  if (window.location.hash === "#cv") {
    swipe_to_two();
  }
}

function swipe_to_one() {
  const container = document.querySelector(".console");
  container.style.transform = "translateX(0)";
}

function swipe_to_two() {
  const container = document.querySelector(".console");
  container.style.transform = "translateX(-100vw)";
}


window.addEventListener("hashchange", swipe_checker);
//window.addEventListener("load", );


let floats_propeties={}
let float_index=0

function float_space(obj, rotation, velocity, more_strength) {
	const propety_key=float_index++;
	obj.propety_key=propety_key;
	floats_propeties[propety_key]={}
	floats_propeties[propety_key].obj=obj

	floats_propeties[propety_key].more_strength=more_strength;
	floats_propeties[propety_key].rotation_strength=rotation;
	floats_propeties[propety_key].velocity=velocity;

	floats_propeties[propety_key].rotation=0;
	//floats_propeties[propety_key].position=[obj.style.top, ];

	//obj.style.transform=`rotate(${rotation}deg)`;
	//obj.style.top=(percent_pos[0]).toString()+"%";
	//obj.style.left=(percent_pos[1]).toString()+"%";
}



requestAnimationFrame(float_animate);
const float_zero=performance.now();
let float_time=performance.now();

function float_animate() {
  const delta = performance.now() - float_time;
	float_time = performance.now();

	for (let propety_key in floats_propeties)
	{
		float_tick(propety_key, delta)
	}

	requestAnimationFrame(float_animate);
}

function float_tick(propety_key, delta) {
	let propety=floats_propeties[propety_key];
	let obj=propety.obj;

	//const life=(performance.now() - float_zero);
	const more=obj.matches(':hover') ? propety.more_strength : 1;

	//change
	propety.rotation+=delta*0.0001*propety.rotation_strength*more;

	obj.style.transform=`rotate(${propety.rotation}deg)`;
}

window.addEventListener("load", async () => {
	swipe_checker();
	await new Promise(r => setTimeout(r, 1000));
  document.body.classList.remove("preload");
});