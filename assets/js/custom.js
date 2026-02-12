$(document).ready(function () {
  // stops background scrolling
  $(".mobile-menu-btn").on("click", function () {
    const isExpanded = $(this).attr("aria-expanded") === "true";

    if (isExpanded) {
      $("body").addClass("no-scroll");
    } else {
      $("body").removeClass("no-scroll");
    }
  });
  // end

  $(function () {
    var scroll = $(document).scrollTop();
    var navHeight = $(".header-main").outerHeight();

    $(window).scroll(function () {
      var scrolled = $(document).scrollTop();

      if (scrolled > navHeight) {
        $(".header-main").addClass("active");
      } else {
        $(".header-main").removeClass("active");
      }

      if (scrolled > scroll) {
        $(".header-main").removeClass("sticky");
      } else {
        $(".header-main").addClass("sticky");
      }

      scroll = $(document).scrollTop();
    });
  });

  // Optional: Add glass effect on scroll
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });

  // Smooth scroll for anchor links
  // document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  //   anchor.addEventListener("click", function (e) {
  //     e.preventDefault();
  //     const target = document.querySelector(this.getAttribute("href"));
  //     if (target) {
  //       target.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //     }
  //   });
  // });

  // Dummy
  (function () {
    // prefer reduced motion
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      // just reveal everything immediately
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("revealed"));
      return;
    }

    // IntersectionObserver to add .revealed
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      // initial small delay to stagger slightly
      el.style.transitionDelay = Math.random() * 280 + "ms";
      io.observe(el);
    });
  })();

  // Companies Logo Slick Slider - services page
  $(".techCompanySlider").slick({
    slidesToShow: "auto",
    autoplay: false,
    autoplaySpeed: 0,
    speed: 5000,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    dots: false,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          autoplay: true,
          infinite: true,
          variableWidth: true,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          autoplay: true,
          infinite: true,
          variableWidth: true,
        },
      },
    ],
  });

  // Blogs Slick Slider - services page
  $(".blogsSlider").slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    dots: false,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1.2,
        },
      },
    ],
  });

  // Client Testimonial Slider - success story page
  $(".clientTestimonialSlider").slick({
    infinite: true,
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,

    responsive: [
      {
        breakpoint: 992,
        settings: {},
      },
      {
        breakpoint: 575,
        settings: {},
      },
    ],
  });

  // Companies List Logo Slider - success story page
  $(".companiesListSlider").slick({
    slidesToShow: "auto",
    autoplay: false,
    autoplaySpeed: 0,
    speed: 5000,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    dots: false,
    variableWidth: false,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          autoplay: true,
          infinite: true,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          autoplay: true,
          infinite: true,
        },
      },
    ],
  });

  // Experience of tech leaders Slider - success story page
  $(".leadersExperienceSlider").slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    dots: false,

    responsive: [
      {
        breakpoint: 992,
        settings: {},
      },
      {
        breakpoint: 575,
        settings: {},
      },
    ],
  });

  // FancyBox js
  Fancybox.bind("[data-fancybox]", {});
});

// year update js
document.getElementById("currentYear").textContent = new Date().getFullYear();

// unlocked section js start
// Slider functionality
const slider = document.getElementById("velocitySlider");
const valueDisplay = document.getElementById("velocityValue");

slider.addEventListener("input", function () {
  valueDisplay.textContent = this.value;
  calculateROI(this.value);
});

// Tier button functionality
const tierButtons = document.querySelectorAll(".tier-button");
tierButtons.forEach((button) => {
  button.addEventListener("click", function () {
    tierButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
  });
});

// ROI Calculation (example)
const tierRates = {
  junior: {
    salary: 65000,
    baseFeeReduction: 11049.6,
    baseOpportunity: 71749.6,
    baseOpex: 8775,
  },
  "mid-level": {
    salary: 125000,
    baseFeeReduction: 26562.6,
    baseOpportunity: 137834.6,
    baseOpex: 16875,
  },
  senior: {
    salary: 165000,
    baseFeeReduction: 35062.6,
    baseOpportunity: 182134.6,
    baseOpex: 22275,
  },
  "lead-architect": {
    salary: 220000,
    baseFeeReduction: 46762.6,
    baseOpportunity: 242834.6,
    baseOpex: 29700,
  },
};

// Current selected tier (default)
let currentTier = "senior";

// Calculate ROI based on experts and tier
function calculateROI(experts, tier = currentTier) {
  const rates = tierRates[tier];

  if (!rates) {
    console.error("Invalid tier:", tier);
    return;
  }

  const feeReduction = Math.round(rates.baseFeeReduction * experts);
  const opportunity = Math.round(rates.baseOpportunity * experts);
  const opex = Math.round(rates.baseOpex * experts);
  const total = feeReduction + opportunity + opex;
  const monthly = Math.round(total / 12);

  // Update market salary
  const salaryElement = document.querySelector(".salary-amount");
  if (salaryElement) {
    salaryElement.textContent = "$" + rates.salary.toLocaleString();
  }

  // Update metrics
  document.getElementById("feeReduction").textContent =
    "$" + feeReduction.toLocaleString();
  document.getElementById("opportunityBenefit").textContent =
    "$" + opportunity.toLocaleString();
  document.getElementById("opexOptimization").textContent =
    "$" + opex.toLocaleString();
  document.getElementById("totalSavings").textContent =
    "$" + total.toLocaleString();
  document.getElementById("monthlySavings").textContent =
    "≈ $" + monthly.toLocaleString() + " Estimated Savings / Month";
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("velocitySlider");
  const valueDisplay = document.getElementById("velocityValue");
  const tierButtons = document.querySelectorAll(".tier-button");

  // Slider functionality
  if (slider && valueDisplay) {
    slider.addEventListener("input", function () {
      valueDisplay.textContent = this.value;
      calculateROI(parseInt(this.value), currentTier);
    });
  }

  // Tier button functionality
  if (tierButtons.length > 0) {
    tierButtons.forEach((button, index) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        tierButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // Determine tier based on button text
        const buttonText = this.textContent.trim().toLowerCase();
        if (buttonText.includes("junior")) {
          currentTier = "junior";
        } else if (buttonText.includes("mid-level")) {
          currentTier = "mid-level";
        } else if (buttonText.includes("senior")) {
          currentTier = "senior";
        } else if (
          buttonText.includes("lead") ||
          buttonText.includes("architect")
        ) {
          currentTier = "lead-architect";
        }

        // Recalculate with current slider value
        const experts = slider ? parseInt(slider.value) : 5;
        calculateROI(experts, currentTier);
      });
    });
  }

  // Initial calculation
  calculateROI(5, "senior");
});
// unlocked section js end
