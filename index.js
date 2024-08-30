// Ensure jQuery is loaded

// Consolidated Script
$(document).ready(function () {
  // Script 1 - Using jQuery for image height change
  var scrollImage = $("#scrollImage");
  var scrollTrigger = 200;

  $(window).scroll(function () {
    var scroll = $(this).scrollTop();
    var newHeight = 75 - (scroll / scrollTrigger) * 60;
    newHeight = Math.max(newHeight, 65);
    scrollImage.css('height', newHeight + 'vh');
  });

  // Script 2 - Handle Scroll Events
  function handleScroll() {
    const scrollPosition = window.scrollY;

    // Section 1 - Fourth Section Rotation
    handleRotation(scrollPosition, 'fourth-section', '#scrollImage4', 1700, 2500, 15);

    // Section 2 - Scroll Image 2 Rotation
    handleRotation(scrollPosition, 'second-section', '#scrollImage2', 900, 2000, 7, 30);

    // Section 3 - Adjustable Element Bottom Position
    handleAdjustableElement(scrollPosition, 500, 1300);
  }

  // Section 1 - Rotation Only
  function handleRotation(scrollPosition, sectionId, elementSelector, start, end, maxRotation, maxPadding=0) {
    const scrollTriggerSection = document.getElementById(sectionId);
    let rotationAngle = 0;
    let paddingValue = 0;

    if (scrollPosition > start && scrollPosition < end) {
      const progress = (scrollPosition - start) / (end - start);
      rotationAngle = maxRotation * progress;
      paddingValue = maxPadding * progress;
    } else if (scrollPosition >= end) {
      rotationAngle = maxRotation;
      paddingValue = maxPadding;
    }

    document.querySelector(elementSelector).style.transform = `rotate(${rotationAngle}deg)`;
    document.querySelector('#scrollImage2').style.paddingLeft = `${paddingValue}px`;

  }

  // Section 2 - Adjustable Element Bottom Position
  function handleAdjustableElement(scrollPosition, startScroll, endScroll) {
    const adjustableElement = document.getElementById('sofa-img-1');

    if (scrollPosition >= startScroll && scrollPosition <= endScroll) {
      const adjustedBottom = easeOutQuad(Math.min(1, (scrollPosition - startScroll) / (endScroll - startScroll))) * 80;
      adjustableElement.style.bottom = `${adjustedBottom}px`;
    }
  }

  // Easing function (Quadratic Ease Out)
  function easeOutQuad(t) {
    return t * (2 - t);
  }

  // Attach the scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Script 3 - Scroll to Navbar
  
});

function scrollToNavbar() {
    const navbar = document.getElementById('navbar');
    navbar.scrollIntoView({ behavior: 'smooth' });
  }

document.getElementById('saveContact').addEventListener('click', function() {
      var vCardData = 'BEGIN:VCARD\nVERSION:3.0\nFN:Alex\nORG:Velvante\nTEL:+917561071623\nEMAIL:info@velvante.com\nEND:VCARD';
      var vCardBlob = new Blob([vCardData], { type: 'text/vcard' });
      var vCardUrl = URL.createObjectURL(vCardBlob);

      // Create a link element and simulate a click to trigger the download
      var link = document.createElement('a');
      link.href = vCardUrl;
      link.download = 'contact.vcf';
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(vCardUrl);
});