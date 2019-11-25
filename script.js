MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const days = Object.freeze({
	SUNDAY:   0,
	MONDAY:  1,
	TUESDAY: 2,
	WEDNESDAY: 3,
	THURSDAY: 4,
	FRIDAY: 5,
	SATURDAY: 6,
});

const observer = new MutationObserver(function(mutations, observer) {
	$(document).ready(function(){
		const today = new Date();
		const { THURSDAY, FRIDAY, SATURDAY } = days;


		const isToMaster = $('.commit-ref')[0].innerText === 'master';
		const isPROpen = !!$(".State.State--green");
		const isWeekend = [THURSDAY, FRIDAY, SATURDAY].includes(today.getDay());

		const branchActionBody = $('.branch-action-body');

		const conditionalRender = isPROpen && isToMaster && isWeekend;
		debugger;

		if(conditionalRender){
			const watermarkContainer = $('#watermarkContainer');
			if(watermarkContainer.length === 1) return;

			const watermark =
				`<div id="watermarkContainer">
				<h1>This is the weekend! 😅<br/>Do you really want to merge?</h1>
				<button id="watermarkButton">
					Remove guard!
				</button>
			</div>`;

			$(watermark).prependTo(branchActionBody);

			$("#watermarkButton").click(function(){
				$('#watermarkContainer').remove();
			});
		}
	});
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
	subtree: true,
	attributes: true
	//...
});