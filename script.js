// Year in footer
document.getElementById("yr")?.textContent = new Date().getFullYear();

// Gallery modal
function openModal(img) {
  document.getElementById("imgModal").style.display = "block";
  document.getElementById("modalImg").src = img.src;
  document.getElementById("caption").innerHTML = img.alt || "";
  document.getElementById("imgModal").setAttribute("aria-hidden", "false");
}
function closeModal() {
  document.getElementById("imgModal").style.display = "none";
  document.getElementById("imgModal").setAttribute("aria-hidden", "true");
}

// Close modal on click outside image
window.onclick = function (event) {
  const modal = document.getElementById("imgModal");
  if (event.target === modal) {
    closeModal();
  }
};

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Back to top visibility
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (toTop) toTop.style.display = window.scrollY > 300 ? "block" : "none";
});

// (The rest of the Committee/script.js content)
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("yr").textContent = new Date().getFullYear();

  const gallery = {
    modal: document.getElementById("imgModal"),
    modalImg: document.getElementById("modalImg"),
    caption: document.getElementById("caption"),
    images: document.querySelectorAll(
      '.gallery img[onclick="openModal(this)"]',
    ),
    open(img) {
      this.modal.style.display = "block";
      this.modalImg.src = img.src;
      this.caption.innerHTML = img.alt || "Ganesh Puja Gallery";
      this.modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      this.modalImg.classList.add("loaded");
    },
    close() {
      this.modal.style.display = "none";
      this.modalImg.classList.remove("loaded");
      this.modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    },
  };

  document
    .querySelector(".close")
    ?.addEventListener("click", () => gallery.close());
  gallery.modal?.addEventListener("click", (e) => {
    if (e.target === gallery.modal) gallery.close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && gallery.modal.style.display === "block")
      gallery.close();
  });
  window.openModal = function (img) {
    gallery.open(img);
  };
  window.closeModal = function () {
    gallery.close();
  };

  gallery.images.forEach((img) => {
    img.onload = () => img.classList.add("loaded");
    img.onerror = () => {
      img.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI5MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=";
      img.alt = "Image not available";
    };
  });

  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const toTopBtn = document.getElementById("toTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      if (toTopBtn) {
        toTopBtn.style.display = "block";
        toTopBtn.style.opacity = "1";
      }
    } else {
      if (toTopBtn) toTopBtn.style.display = "none";
    }
  });
  toTopBtn?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        entry.target.classList.add("fade-in", "visible");
    });
  }, observerOptions);
  document
    .querySelectorAll("section")
    .forEach((section) => observer.observe(section));

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });
    document
      .querySelectorAll("img[data-src]")
      .forEach((img) => imageObserver.observe(img));
  }

  const navLinks = document.querySelector(".links");
  if (window.innerWidth <= 768 && navLinks)
    navLinks.style.flexDirection = "column";

  function createParticles() {
    const hero = document.querySelector("header");
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const particle = document.createElement("div");
        particle.style.cssText = `position: absolute; width: 4px; height: 4px; background: var(--accent); border-radius: 50%; pointer-events: none; left: ${Math.random() * 100}%; top: 100%; animation: float ${3 + Math.random() * 2}s linear infinite; z-index: 10;`;
        particle.innerHTML = "✨";
        particle.style.fontSize = "12px";
        hero.appendChild(particle);
        setTimeout(() => particle.remove(), 5000);
      }, i * 200);
    }
  }
  setInterval(createParticles, 8000);
  createParticles();

  const style = document.createElement("style");
  style.textContent = `@keyframes float { to { transform: translateY(-100vh) rotate(360deg); opacity: 0; } } @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 20px rgba(255,204,0,0.5); } 50% { box-shadow: 0 0 40px rgba(255,204,0,0.8); } }`;
  document.head.appendChild(style);
  console.log(
    "🌟 Ganesh Puja Committee Website Enhanced! Ready for Ganesh Chaturthi 2026 ✨",
  );
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const pujaDate = new Date("2026-09-14T11:00:00").getTime();
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = pujaDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
    if (distance < 0) {
      document
        .querySelector(".countdown-display")
        .classList.add("countdown-celebration");
      document.getElementById("days").textContent = "🎉";
      document.getElementById("hours").textContent = "PUJA";
      document.getElementById("minutes").textContent = "TIME";
      document.getElementById("seconds").textContent = "🙏";
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

function donateUPI(app) {
  const upiIds = {
    phonepe: "ganeshpuja.punanga@paytm",
    gpay: "abhisekghose5@ybl",
    paytm: "ganeshpuja.punanga@paytm",
    whatsapp: "abhisekghose5@paytm",
  };
  const upiId = upiIds[app] || "abhisekghose5@ybl";
  const message = encodeURIComponent("Committee Puja Donation 2026 🙏");
  const upiLinks = {
    phonepe: `phonepe://pay?pa=${upiId}&pn=Ganesh Puja Committee&cu=INR&message=${message}`,
    gpay: `tez://tezxlp://pay?pa=${upiId}&pn=Ganesh Puja Committee&am=&cu=INR&tn=${message}`,
    paytm: `paytmmp://pay?pa=${upiId}&pn=Ganesh Puja Committee&amount=101&message=${message}`,
    whatsapp: `whatsapp://pay?pa=${upiId}`,
  };
  const link =
    upiLinks[app] ||
    `upi://pay?pa=${upiId}&pn=Ganesh Puja Committee&cu=INR&tn=${message}`;
  window.open(link, "_blank");
  showToast("🔔 Opening " + app.toUpperCase() + "...");
}

function copyUPI() {
  const upiId = "ganeshpuja.punanga@paytm";
  navigator.clipboard
    .writeText(upiId)
    .then(() => {
      showToast("✅ UPI ID copied! Paste in your UPI app");
    })
    .catch(() => {
      const textArea = document.createElement("textarea");
      textArea.value = upiId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast("✅ UPI ID copied!");
    });
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.style.cssText = `position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, var(--primary), var(--accent)); color: white; padding: 15px 25px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 9999; font-weight: 600; transform: translateX(400px); transition: transform 0.3s ease;`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => (toast.style.transform = "translateX(0)"), 100);
  setTimeout(() => {
    toast.style.transform = "translateX(400px)";
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

// Confirmation & WhatsApp form handling (simplified)
document.addEventListener("DOMContentLoaded", function () {
  const COMMITTEE_PHONE = "919937109492";
  const UPI_ID = "ganeshpuja.punanga@paytm";
  let donationAmount = "101";
  const form = document.getElementById("whatsappForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const donorName = document.getElementById("donorName").value.trim();
      const donorPhone = document.getElementById("donorPhone").value.trim();
      if (!donorName) {
        showToast("⚠️ Please enter your name", "error");
        return;
      }
      const timestamp = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      const message = `🎉 *GANESH PUJA 2026 - DONATION CONFIRMED* 🎉\n\n🙏 *Donor Name:* ${donorName}\n📱 *Contact:* ${donorPhone || "Not provided"}\n💰 *Amount:* ₹${donationAmount}\n⏰ *Date/Time:* ${timestamp}\n💳 *Payment Method:* UPI (${UPI_ID})\n\n🌟 *Ganapati Bappa Morya!*\n🙌 *Thank you for your generous contribution!*`;
      const whatsappUrl = `https://wa.me/${COMMITTEE_PHONE}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
      showToast(
        "✅ WhatsApp sent successfully! 🙏 Ganapati Bappa Morya!",
        "success",
      );
    });
  }
});
