const setHeightForImg = (firstImage, secondImage, blockWidth) => {
  const image1 = firstImage;
  const image2 = secondImage;
  const widthImg1 = +image1.naturalWidth;
  const heightImg1 = +image1.naturalHeight;

  if (!image2) {
    const halfWidth = Math.floor(blockWidth / 2);
    const k1 = Math.floor((halfWidth + 10) / widthImg1 * 100) / 100;
    image1.style.width = `${widthImg1 * k1}px`;
    image1.style.height = `${heightImg1 * k1}px`;
    return;
  }

  const widthImg2 = +image2.naturalWidth;
  const heightImg2 = +image2.naturalHeight;
  const denominator = Math.floor((widthImg1 * heightImg2 / heightImg1 + widthImg2) * 100);
  const secondMultiplierResult = Math.floor(blockWidth / (denominator / 100) * 100) / 100;
  const secondMultiplier = secondMultiplierResult;
  const firstMultiplier = Math.floor(heightImg2 * secondMultiplier / heightImg1 * 100) / 100;

  const finalWidthOfFirstImg = widthImg1 * firstMultiplier;
  const finalWidthOfSecondImg = widthImg2 * secondMultiplier;

  image1.style.width = `${finalWidthOfFirstImg}px`;
  image2.style.width = `${finalWidthOfSecondImg}px`;
};

const callCycle = (number, arr, blockWidth) => {
  for (let i = 0, j = -1; i < number; i += 1) {
    setHeightForImg(arr[j += 1], arr[j += 1], blockWidth);
  }
};

const checkImgArrAndGo = (container, element) => {
  const pickupWrapper = document.querySelector(`.${container}`);
  const images = document.querySelectorAll(`.${element}`);

  if (!images || !pickupWrapper) {
    return;
  }

  const rightImageMargin = 10;
  const galleryWidth = pickupWrapper.offsetWidth - rightImageMargin;
  const arrayLength = images.length;
  const evenNumberOfArrElements = arrayLength % 2 === 0 ? arrayLength / 2 : (arrayLength - 1) / 2;

  if (arrayLength === 1) {
    setHeightForImg(images[arrayLength - 1], false, galleryWidth);
  } else if (arrayLength !== 0 && arrayLength % 2 === 0) {
    callCycle(evenNumberOfArrElements, images, galleryWidth);
  } else if (arrayLength !== 0) {
    callCycle(evenNumberOfArrElements, images, galleryWidth);
    setHeightForImg(images[arrayLength - 1], false, galleryWidth);
  }
};

export default checkImgArrAndGo;
