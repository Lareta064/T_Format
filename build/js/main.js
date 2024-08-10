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
	var portfolioSwiper = new Swiper('.portfolio-swiper', {
		slidesPerView:2,
		speed:1000,
		navigation:{
			nextEl:'.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			640: {
			slidesPerView: 3,
			},
			768:{
				slidesPerView: 4,
			}
		}
	});
	/************************** */

	const serviceCards = document.querySelectorAll('.serv-card');
    if(serviceCards.length > 0){
		function setupEventListeners() {
			const mediaQuery = window.matchMedia('(max-width: 767px)');

			if (mediaQuery.matches) {
				/** Event for screen < 768 */
				serviceCards.forEach(card => {
					const servCardBtn = card.querySelector('.serv-card-btn');
					const markList = card.querySelector('.mark-list');

					const clickHandler = () => {
						if (card.classList.contains('active')) {
							card.classList.remove('active');
							markList.style.maxHeight = '0';
						} else {
							card.classList.add('active');
							markList.style.maxHeight = markList.scrollHeight + 'px';
						}
					};

					servCardBtn.addEventListener('click', clickHandler);

					// Store handler to remove later
					card.clickHandler = clickHandler;
				});
			} else {
				/** Event for screen >= 768 */
				serviceCards.forEach(card => {
					const markList = card.querySelector('.mark-list');

					const mouseEnterHandler = () => {
						card.classList.add('active');
						markList.style.maxHeight = markList.scrollHeight + 'px';
					};

					const mouseLeaveHandler = () => {
						card.classList.remove('active');
						markList.style.maxHeight = '0';
					};

					card.addEventListener('mouseenter', mouseEnterHandler);
					card.addEventListener('mouseleave', mouseLeaveHandler);

					// Store handlers to remove later
					card.mouseEnterHandler = mouseEnterHandler;
					card.mouseLeaveHandler = mouseLeaveHandler;
				});
			}
		}

		function removeEventListeners() {
			serviceCards.forEach(card => {
				const servCardBtn = card.querySelector('.serv-card-btn');

				// Remove click handlers for mobile
				if (card.clickHandler) {
					servCardBtn.removeEventListener('click', card.clickHandler);
					delete card.clickHandler;
				}

				// Remove mouseenter/mouseleave handlers for desktop
				if (card.mouseEnterHandler) {
					card.removeEventListener('mouseenter', card.mouseEnterHandler);
					delete card.mouseEnterHandler;
				}
				if (card.mouseLeaveHandler) {
					card.removeEventListener('mouseleave', card.mouseLeaveHandler);
					delete card.mouseLeaveHandler;
				}
			});
		}

		// Initial setup
		setupEventListeners();

		// Re-apply event listeners on screen resize
		window.addEventListener('resize', function() {
			removeEventListeners();
			setupEventListeners();
		});
	}
	// ======custom input type file ====
	const fileInputs = document.querySelectorAll('.file-input');

    fileInputs.forEach(input => {
        const fileLabel = input.closest('.custom-file-input').querySelector('.file-label');

        input.addEventListener('change', function () {
            const fileName = input.files[0]?.name || 'Прикрепить файл';
            fileLabel.querySelector('.file-text').textContent = fileName;
        });
    });
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

		if(button){
			button.addEventListener('click', toggleContent);
			// Close content if clicked outside
			document.addEventListener('click', function (event) {
				if (!button.contains(event.target) && !content.contains(event.target)) {
					
					content.classList.remove('active');
					button.classList.remove('active');
				}
			});
		}
	}

	// Call the function with the class names of the button and content
	setupActive('filters-toggle', 'filters-drop');
	setupActive('label-trigger', 'catalogy-menu-drop');
	/**********FOTORAMA*********** */
	 const fotoramaThumbs = document.querySelector('.fotorama-thumbs');
     const mainImage = document.querySelector('.fd-img');
    const mainLink = document.querySelector('.fd-link');
	if(fotoramaThumbs){
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
	}

    // Click outside to remove active state (Optional)
    // document.addEventListener('click', (event) => {
    //     if (!fotoramaThumbs.contains(event.target)) {
    //         document.querySelectorAll('.ft-item').forEach(item => {
    //             item.classList.remove('ft-item-active');
    //         });
    //     }
    // });

	/*================ STAGES TABS============ */
	$('.custom-tabs').each(function() {
		
		let ths = $(this);
		ths.find('.tab-item').not(':first').hide();
		console.log($('.tab-item'));
		ths.find('.tab-btn').click(function() {
			ths.find('.tab-btn').removeClass('active').eq($(this).index()).addClass('active');

			ths.find('.tab-item').hide().eq($(this).index()).fadeIn()
		}).eq(0).addClass('active');
		
	});

	/*============== ACORDION ========== */
	;(function ($, window, document, undefined) {
		"use strict";
		var pluginName = 'simpleAccordion',
		defaults = {
			multiple: false,
			speedOpen: 300,
			speedClose: 150,
			easingOpen: null,
			easingClose: null,
			headClass: 'accordion-header',
			bodyClass: 'accordion-body',
			openClass: 'open',
			defaultOpenClass: 'default-open',
			cbClose: null, //function (e, $this) {},
			cbOpen: null //function (e, $this) {}
		};
		function Accordion(element, options) {
			this.$el = $(element);
			this.options = $.extend({}, defaults, options);
			this._defaults = defaults;
			this._name = pluginName;
			if (typeof this.$el.data('multiple') !== 'undefined') {
				this.options.multiple = this.$el.data('multiple');
				} else {
				this.options.multiple = this._defaults.multiple;
			}
			this.init();
		}
		Accordion.prototype = {
			init: function () {
				var o = this.options,
				$headings = this.$el.children('.' + o.headClass);
				$headings.on('click', {_t:this}, this.headingClick);
				$headings.filter('.' + o.defaultOpenClass).first().click();
			},
			headingClick: function (e) {
				var $this = $(this),
				_t = e.data._t,
				o = _t.options,
				$headings = _t.$el.children('.' + o.headClass),
				$currentOpen = $headings.filter('.' + o.openClass);
				if (!$this.hasClass(o.openClass)) {
					if ($currentOpen.length && o.multiple === false) {
						$currentOpen.removeClass(o.openClass).next('.' + o.bodyClass).slideUp(o.speedClose, o.easingClose, function () {
							if ($.isFunction(o.cbClose)) {
								o.cbClose(e, $currentOpen);
							}
							$this.addClass(o.openClass).next('.' + o.bodyClass).slideDown(o.speedOpen, o.easingOpen, function () {
								if ($.isFunction(o.cbOpen)) {
									o.cbOpen(e, $this);
								}
							});
						});
						} else {
						$this.addClass(o.openClass).next('.' + o.bodyClass).slideDown(o.speedOpen, o.easingOpen, function () {
							$this.removeClass(o.defaultOpenClass);
							if ($.isFunction(o.cbOpen)) {
								o.cbOpen(e, $this);
							}
						});
					}
					} else {
					$this.removeClass(o.openClass).next('.' + o.bodyClass).slideUp(o.speedClose, o.easingClose, function () {
						if ($.isFunction(o.cbClose)) {
							o.cbClose(e, $this);
						}
					});
				}
			}
		};
		$.fn[pluginName] = function (options) {
			return this.each(function () {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName,
					new Accordion(this, options));
				}
			});
		};
	}(jQuery, window, document));
	$(function() {
    	$('.accordion-group').simpleAccordion();
	});

	/*********************** */
	const trigger = document.querySelector('.select-city-trigger');
	const tabs = document.querySelector('.select-city-tabs');
	const tabButtons = document.querySelectorAll('.tab-btn');
	const tabItems = document.querySelectorAll('.tab-item');
	const customOptions = document.querySelectorAll('.custom-option');
	if(trigger){


		// Toggle visibility of tabs on trigger click
		trigger.addEventListener('click', () => {
			tabs.classList.toggle('active');
			trigger.classList.toggle('open', tabs.classList.contains('active')); // Update trigger class
		});

		// Handle tab button clicks
		tabButtons.forEach((button, index) => {
			button.addEventListener('click', () => {
			// Remove active class from all tab buttons
			tabButtons.forEach(btn => btn.classList.remove('active'));
			// Add active class to the clicked tab button
			button.classList.add('active');

			// Remove active class from all tab items
			tabItems.forEach(item => item.classList.remove('active'));
			// Add active class to the tab item corresponding to the clicked button
			tabItems[index].classList.add('active');
			});
		});

		// Handle option selection
		customOptions.forEach(option => {
			option.addEventListener('click', () => {
			// Set the text of the trigger to the selected option's text
			trigger.textContent = option.textContent;
			// Hide the tab content and remove open class
			tabs.classList.remove('active');
			trigger.classList.remove('open');
			});
		});

		// Close tabs if clicked outside
		document.addEventListener('click', (event) => {
			if (!tabs.contains(event.target) && !trigger.contains(event.target)) {
			tabs.classList.remove('active');
			trigger.classList.remove('open');
			}
		});
	}
	//======= modal wrapper ========
	const modals = document.querySelectorAll('.modal-wrapper');
	if(modals.length > 0){
		const modalOpenButtons = document.querySelectorAll('[data-target]');
		const modalCloseButtons = document.querySelectorAll('[data-role]');
		for(let item of modalOpenButtons){
			
			item.addEventListener('click', (e)=>{
				const itemDataValue = item.getAttribute('data-target');
				for(let modalItem of modals ){
					const modalItemData = modalItem.getAttribute('data-modal');
					if(modalItemData == itemDataValue){
						modalItem.classList.add('active');
						bodyEl.classList.add('lock');
					}
				}
			});
			
		}
		for(let modalClose of modalCloseButtons){
			modalClose.addEventListener('click', (e)=>{
				modalClose.closest('.modal-wrapper').classList.remove('active');
				bodyEl.classList.remove('lock');
			});
		}
		for(let modal of modals){
			
			modal.addEventListener('click', (e)=>{
				if(e.target == e.currentTarget){
					modal.classList.remove('active');
					bodyEl.classList.remove('lock');
				}
			});
		}
	}
});