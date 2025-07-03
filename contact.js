function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
      const submitBtn = contactForm.querySelector("button[type='submit']");

      if (!name || !email || !subject || !message) {
        alert("⚠️ يرجى ملء جميع الحقول!");
        return;
      }

      console.log("بيانات النموذج المرسلة:", { name, email, subject, message });

      // تغيير حالة الزر أثناء الإرسال
      submitBtn.disabled = true;
      submitBtn.textContent = "جاري الإرسال...";

      try {
        const scriptURL = "https://script.google.com/macros/s/AKfycbyVy-jJ0DOJb7R_-J-PvjYaj31T5BHdcgkJ5xb1VDBIhhB1UrqUW0vqBsLLeU8Q1hSS/exec";
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("message", message);

        const response = await fetch(scriptURL, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("فشل الاتصال بالخادم");

        const result = await response.text();
        console.log("تم الإرسال بنجاح ✅:", result);
        alert("تم إرسال الرسالة بنجاح!");
        contactForm.reset();

      } catch (error) {
        console.error("❌ خطأ في الإرسال:", error);
        alert("حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
      } finally {
        // إعادة تفعيل الزر وإرجاع النص بعد الإرسال
        submitBtn.disabled = false;
        submitBtn.textContent = "إرسال الرسالة";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", initContactForm);
