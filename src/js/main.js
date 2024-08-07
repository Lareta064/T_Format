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
			});
		}
	// ======custom input type file ====
	const fileInput = document.getElementById('file-input');
  	const fileLabel = document.querySelector('.file-label');
	if(fileInput){

		fileInput.addEventListener('change', function() {
			const fileName = fileInput.files[0]?.name || 'Прикрепить файл';
			fileLabel.querySelector('.file-text').textContent = fileName;
		});
	}
		/*========CUSTOM SELECT======= */
 	const customSelects = document.querySelectorAll('.custom-select');

    customSelects.forEach((customSelect) => {
        const selectTrigger = customSelect.querySelector('.custom-select-trigger');
        const optionsContainer = customSelect.querySelector('.custom-options');
        const optionsList = customSelect.querySelectorAll('.custom-option');

        // Toggle options dropdown
        selectTrigger.addEventListener('click', function(e) {
            e.stopPropagation(); // Останавливаем распространение события
            const isOpen = customSelect.classList.contains('open');
            closeAllSelects();
            if (!isOpen) {
                customSelect.classList.add('open');
                optionsContainer.style.maxHeight = optionsContainer.scrollHeight + 'px';
            } else {
                optionsContainer.style.maxHeight = '0';
            }
        });

        // Update selected option
        optionsList.forEach((option) => {
            option.addEventListener('click', function() {
                selectTrigger.textContent = option.textContent;
                selectTrigger.dataset.value = option.dataset.value;
                customSelect.classList.remove('open');
                optionsContainer.style.maxHeight = '0';
            });
        });
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', function() {
        closeAllSelects();
    });

    function closeAllSelects() {
        customSelects.forEach((select) => {
            select.classList.remove('open');
            const optionsContainer = select.querySelector('.custom-options');
            if (optionsContainer) {
                optionsContainer.style.maxHeight = '0';
            }
        });
    }
	function setupActive(buttonClass, contentClass) {
		const button = document.querySelector(`#${buttonClass}`);
		const content = document.querySelector(`#${contentClass}`);

		function toggleContent() {
			if (content.classList.contains('active')) {
				
				content.classList.remove('active');
				button.classList.remove('active');
			} else {
				
				content.classList.add('active');
				button.classList.add('active');
			}
		}

		// Add click event listener to the button
		button.addEventListener('click', toggleContent);

		// Close content if clicked outside
		document.addEventListener('click', function (event) {
			if (!button.contains(event.target) && !content.contains(event.target)) {
				
				content.classList.remove('active');
				button.classList.remove('active');
			}
		});
	}

	// Call the function with the class names of the button and content
	setupActive('filters-toggle', 'filters-drop');
	/**********FOTORAMA*********** */
	 const fotoramaThumbs = document.querySelector('.fotorama-thumbs');
     const mainImage = document.querySelector('.fd-img');
    const mainLink = document.querySelector('.fd-link');

    fotoramaThumbs.addEventListener('click', (event) => {
        const clickedItem = event.target.closest('.ft-item');
        if (!clickedItem) return;

        // Remove active class from all thumbnails
        document.querySelectorAll('.ft-item').forEach(item => {
            item.classList.remove('ft-item-active');
        });

        // Add active class to clicked thumbnail
        clickedItem.classList.add('ft-item-active');

        // Update the main image src and link href
        const imgElement = clickedItem.querySelector('img');
        mainImage.src = imgElement.getAttribute('src');
        mainLink.href = imgElement.getAttribute('data-src');
    });

    // Click outside to remove active state (Optional)
    document.addEventListener('click', (event) => {
        if (!fotoramaThumbs.contains(event.target)) {
            document.querySelectorAll('.ft-item').forEach(item => {
                item.classList.remove('ft-item-active');
            });
        }
    });
});