// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", () => {
    // Declare AOS if it's not already available globally
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      })
    } else {
      console.warn("AOS is not defined. Make sure AOS library is included.")
    }
  
    // Set current time in footer
    updateTime()
    setInterval(updateTime, 1000)
  
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode")
      updateDarkModeIcon(true)
    }
  
    // Initialize portfolio filter
    initPortfolioFilter()
  
    // Initialize contact form
    initContactForm()
  })
  
  // Toggle mobile menu
  function toggleMenu() {
    const navLinks = document.querySelector(".nav-links")
    const hamburger = document.querySelector(".hamburger-menu")
  
    navLinks.classList.toggle("active")
    hamburger.classList.toggle("active")
  
    // Animate hamburger to X
    const lines = document.querySelectorAll(".hamburger-menu div")
    if (hamburger.classList.contains("active")) {
      lines[0].style.transform = "rotate(45deg) translate(5px, 5px)"
      lines[1].style.opacity = "0"
      lines[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
    } else {
      lines[0].style.transform = "none"
      lines[1].style.opacity = "1"
      lines[2].style.transform = "none"
    }
  }
  
  // Toggle dark mode
  function toggleDarkMode() {
    const body = document.body
    body.classList.toggle("dark-mode")
  
    // Save preference to localStorage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark")
      updateDarkModeIcon(true)
    } else {
      localStorage.setItem("theme", "light")
      updateDarkModeIcon(false)
    }
  }
  
  // Update dark mode icon
  function updateDarkModeIcon(isDark) {
    const icon = document.querySelector(".dark-mode-toggle")
    if (isDark) {
      icon.classList.remove("fa-moon")
      icon.classList.add("fa-sun")
    } else {
      icon.classList.remove("fa-sun")
      icon.classList.add("fa-moon")
    }
  }
  
  // Update time in footer
  function updateTime() {
    const timeElement = document.getElementById("currentTime")
    const now = new Date()
  
    // Format for Arabic locale
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }
  
    timeElement.textContent = now.toLocaleString("ar-SA", options)
  }
  
  // Initialize portfolio filter
  function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn")
    const galleryItems = document.querySelectorAll(".gallery-item")
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        // Get filter value
        const filterValue = this.getAttribute("data-filter")
  
        // Filter gallery items
        galleryItems.forEach((item) => {
          const category = item.getAttribute("data-category")
  
          if (filterValue === "all" || filterValue === category) {
            item.style.display = "block"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "scale(1)"
            }, 100)
          } else {
            item.style.opacity = "0"
            item.style.transform = "scale(0.8)"
            setTimeout(() => {
              item.style.display = "none"
            }, 300)
          }
        })
      })
    })
  }
  
  // Initialize contact form
  function initContactForm() {
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        // Get form values
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
  
        // Validate form
        if (!name || !email || !subject || !message) {
          alert("يرجى ملء جميع الحقول المطلوبة")
          return
        }
  
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert("تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.")
  
        // Reset form
        contactForm.reset()
      })
    }
  }
  
  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    const navLinks = document.querySelector(".nav-links")
    const hamburger = document.querySelector(".hamburger-menu")
  
    if (
      navLinks.classList.contains("active") &&
      !event.target.closest(".nav-links") &&
      !event.target.closest(".hamburger-menu")
    ) {
      navLinks.classList.remove("active")
      hamburger.classList.remove("active")
  
      // Reset hamburger icon
      const lines = document.querySelectorAll(".hamburger-menu div")
      lines[0].style.transform = "none"
      lines[1].style.opacity = "1"
      lines[2].style.transform = "none"
    }
  })
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
  
      const targetId = this.getAttribute("href")
      if (targetId === "#") return
  
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Close mobile menu if open
        const navLinks = document.querySelector(".nav-links")
        if (navLinks.classList.contains("active")) {
          toggleMenu()
        }
  
        // Scroll to target
        targetElement.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })
  