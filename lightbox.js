/* Click or press Enter on a photo to see it full size. The page works the same
   without this script; it only adds the larger view. */
(function () {
  var images = document.querySelectorAll("main figure img");
  if (!images.length || typeof HTMLDialogElement !== "function") return;

  var dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Enlarged photo");
  dialog.innerHTML =
    '<button type="button" class="lightbox__close" aria-label="Close">&times;</button>' +
    '<figure class="lightbox__figure"><img class="lightbox__img" alt=""><figcaption class="lightbox__caption"></figcaption></figure>';
  document.body.appendChild(dialog);

  var bigImg = dialog.querySelector(".lightbox__img");
  var caption = dialog.querySelector(".lightbox__caption");
  var opener = null;

  function open(img) {
    opener = img;
    bigImg.src = img.currentSrc || img.src;
    bigImg.alt = img.alt;
    var cap = img.closest("figure").querySelector("figcaption");
    caption.textContent = cap ? cap.textContent.replace(/\s+/g, " ").trim() : "";
    caption.hidden = !caption.textContent;
    dialog.showModal();
    document.documentElement.classList.add("lightbox-open");
  }

  dialog.addEventListener("close", function () {
    document.documentElement.classList.remove("lightbox-open");
    bigImg.removeAttribute("src");
    if (opener) opener.focus();
  });

  // a click anywhere except on the photo itself closes the view
  dialog.addEventListener("click", function (e) {
    if (e.target !== bigImg) dialog.close();
  });

  images.forEach(function (img) {
    img.classList.add("zoomable");
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "View larger: " + img.alt);
    img.addEventListener("click", function () { open(img); });
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(img);
      }
    });
  });
})();
