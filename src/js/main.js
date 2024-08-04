document.addEventListener("DOMContentLoaded", function () {
	$('.lazy').lazy();
	const bodyEl = document.body;
	const menuToggle = document.querySelector('#menu-toggle');
	const mobileMenu = document.querySelector('#menu');

	function resetActiveMenu(){
		mobileMenu.classList.remove('active');
		menuToggle.classList.remove('active');
		bodyEl.classList.remove('lock');
	}
	/*===============MOBILE MENU ==================*/
	if (menuToggle) {
		menuToggle.addEventListener('click', ()=> {
			if (menuToggle.classList.contains('active')) {
				resetActiveMenu();
			
			} else {
				menuToggle.classList.add('active');
			    mobileMenu.classList.add('active');
				bodyEl.classList.add('lock');
				
			}
		});
		mobileMenu.addEventListener('click', (e)=>{
			if(e.target == e.currentTarget){
				resetActiveMenu();
			}
		});
		function checkScreenSize() {
			if (window.innerWidth > 1023) {
				resetActiveMenu();
			}
		}
		// Проверка размера экрана при загрузке страницы
		checkScreenSize();
		// Проверка размера экрана при изменении размера окна
		window.addEventListener('resize', checkScreenSize);
	}	
	// моб меню - показать выпадающие меню
	const openMenuLevel2 = document.querySelectorAll('.drop-menu_2');
	const openMenuLevel3 = document.querySelectorAll('.drop-menu_3');


	function foldWithChildren(dropMenuItem) {
		let itemIcon = dropMenuItem.querySelector(".drop-icon");
		let childrenMenu = dropMenuItem.querySelector(".submenu");

		itemIcon.classList.remove('active');
		childrenMenu.classList.remove('active');

		let childrenMenuChildren = childrenMenu.querySelectorAll('.drop-menu');
		for (let item of childrenMenuChildren) {
			foldWithChildren(item);
		}
	}

	function goUpAndFoldSiblings(dropMenuItem) {
		let ancestor = dropMenuItem.parentElement.closest('.drop-menu');

		if (ancestor == null)
			return;

		let next = dropMenuItem.nextElementSibling;
		while (next != null) {
			if (next.classList.contains("drop-menu")) {
				foldWithChildren(next);
			}
			next = next.nextElementSibling;
		}
		let prev = dropMenuItem.previousElementSibling;
		while (prev != null) {
			if (prev.classList.contains("drop-menu")) {
				foldWithChildren(prev);
			}
			prev = prev.previousElementSibling;
		}
		goUpAndFoldSiblings(ancestor);
	}

	function showSubmenu(item, subMenuClass) {
		item.addEventListener('click', function (e) {
			//e.stopPropagation();

			const thisIcon = this.querySelector('.drop-icon')
			const subMenuLevel = this.querySelector(`${subMenuClass}`)

			if (e.target == thisIcon) {

				if (thisIcon.classList.contains('active')) {
					foldWithChildren(item);
					//subMenuLevel.classList.remove('active');
					//thisIcon.classList.remove('active');
				} else {
					goUpAndFoldSiblings(item);
					subMenuLevel.classList.add('active');
					thisIcon.classList.add('active');
				}
			}
		});
	}
	for (let item of openMenuLevel2) {
		showSubmenu(item, '.submenu-2');
	}
	for (let item of openMenuLevel3) {
		showSubmenu(item, '.submenu-3');
	}
	/*=============== END MOBILE MENU ==================*/
	var heroSlider = new Swiper('.hero-swiper', {
		speed: 1000,
		effect: 'fade',
		loop: true,
		// autoplay:{
		// 	delay: 3000,
		// },
		pagination:{
			 el: ".hero-pagination",
			 clickable: true,
		}
	});
	/************************** */
	const servCards = document.querySelectorAll('.serv-card');
	
		for(item of servCards){
			const servCardBtn = item.querySelector('.serv-card-btn');
			
			servCardBtn.addEventListener('click', ()=>{
				const thisParent = servCardBtn.closest('.serv-card');
				const dropList = thisParent.querySelector('.mark-list');
				console.log(dropList.scrollHeight);
				if(thisParent.classList.contains('active')){
					 thisParent.classList.remove('active');
					 if(dropList){dropList.style.maxHeight = 0;}
					 
					 
				}else{
					thisParent.classList.add('active');
					if(dropList){dropList.style.maxHeight = dropList.scrollHeight + 'px';}
				}
			})

		}

});