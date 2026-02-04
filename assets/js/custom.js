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

// ROI Calculation (simplified example)
function calculateROI(experts) {
  const baseFeeReduction = 35062.6;
  const baseOpportunity = 182134.6;
  const baseOpex = 22275;

  const feeReduction = Math.round(baseFeeReduction * experts);
  const opportunity = Math.round(baseOpportunity * experts);
  const opex = Math.round(baseOpex * experts);
  const total = feeReduction + opportunity + opex;
  const monthly = Math.round(total / 12);

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

// unlocked section js end
