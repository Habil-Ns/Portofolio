// Menu Show Hidden
const navmenu = document.getElementById("nav-menu"),
	navtoggle = document.getElementById("nav-toggle"),
	navclose = document.getElementById("nav-close");

//  =================== Membuka menu ===================
// Menu show (Jika icon app ditekan maka akan muncul menu)
// Nama dari classlist harus sesuai dengan nama dari cssnya (show-menu)
if (navtoggle) {
	navtoggle.addEventListener("click", () => {
		navmenu.classList.add("show-menu");
	});
}

// ================ Remove menu ==================
// Jika menekan tanda silang maka menu disembunyikan
if (navclose) {
	navclose.addEventListener("click", () => {
		navmenu.classList.remove("show-menu");
	});
}

// Menghapus menu mobile queryselectorall (memilih seluruh class)
const navlink = document.querySelectorAll(".nav_link");

function linkAction() {
	const navmenu = document.getElementById("nav-menu");
	// Ketika memilih salah satu link kita menghapus(keluar) dari seluruh menunya
	navmenu.classList.remove("show-menu");
}
navlink.forEach((n) => n.addEventListener("click", linkAction));

// ===================== Accordion Skills =================
const skills_Content = document.getElementsByClassName("skills_content"),
	skills_Header = document.querySelectorAll(".skills_header");

function toggleskills() {
	let itemclass = this.parentNode.className;

	// Menutup class
	// Jika class skills open 1 terbuka dan ingin membuka skills_close maka skills open 1 menjadi tertutup (close)
	for (let i = 0; i < skills_Content.length; i++) {
		skills_Content[i].className = "skills_content skills_close";
	}

	// Membuka class
	// Jika class yang dipanggil merupakan skills yang close maka akan dibuka seperti class skills open
	if (itemclass === "skills_content skills_close") {
		this.parentNode.className = "skills_content skills_open";
	}
}

// Jika skills_header diclick maka akan melakukan toggleskills
skills_Header.forEach((bantuan) => {
	bantuan.addEventListener("click", toggleskills);
});

// =================== Portfolio Swiper =====================
let swiper_portfolio = new Swiper(".portfolio_container", {
	cssMode: true,
	loop: false,
	rewind: true, // balik ke awal/akhir saat mentok
	slidesPerView: 1,
	navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
	pagination: { el: ".swiper-pagination", clickable: true },
});

// ============== Scroll section active link ==================
// Icon menjadi berwarna ketika discroll atau di klik (menuju tempatnya) misal ke about maka icon about menjadi berwarna
// Section id merujuk pada section section di html, nav_menu merujuk pada menu menu yang terdapat di html dan active-link merujuk pada CSS dan active link ini juga diberikan ke html sebagai default

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
	const scrollY = window.pageYOffset;

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 50;
		const sectionId = current.getAttribute("id");

		const navLink = document.querySelector(
			'.nav_menu a[href="#' + sectionId + '"]'
		);

		if (navLink) {
			if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
				navLink.classList.add("active-link");
			} else {
				navLink.classList.remove("active-link");
			}
		}
	});
}

window.addEventListener("scroll", scrollActive);

// ============== Change Background Header ==================
// Memberikan bayangan pada header ketika dilakukan scroll (vertikal)
// Header merujuk pada class header di html, scroll-header pada terdapat pada css

function scrollHeader() {
	const nav = document.getElementById("header");
	// When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
	if (this.scrollY >= 80) nav.classList.add("scroll-header");
	else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

// ==================== Show scroll up ========================
// Ketika layar discroll kebawah maka akan menampilkan tanda panah
// id harus sesuai dengan id yang terdapat di html, nama show-scroll sesuai dengan di CSS

function scrollup() {
	const scrollup = document.getElementById("scroll-up");
	// When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
	if (this.scrollY >= 560) scrollup.classList.add("show-scroll");
	else scrollup.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollup);

// =================== Dark light theme ======================
// idnya harus sesuai yang di HTMl, const darktheme harus sesuai dengan yang di CSS, icontheme diambil dari iconscout
const themeButton = document.getElementById("theme-button");
const darkTheme = "tema-gelap";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
	document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
	themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
	// If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
	document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
		darkTheme
	);
	themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
		iconTheme
	);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
	// Add or remove the dark / icon theme
	document.body.classList.toggle(darkTheme);
	themeButton.classList.toggle(iconTheme);
	// We save the theme and the current icon that the user chose
	localStorage.setItem("selected-theme", getCurrentTheme());
	localStorage.setItem("selected-icon", getCurrentIcon());
});
