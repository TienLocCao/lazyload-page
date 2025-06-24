import { ref, onUnmounted, type Ref } from 'vue';

export const useIntersectionObserver = (
  element: Ref<HTMLElement | null>,
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = { rootMargin: '50px' }
): { unobserve: () => void } => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, options);

  if (element.value) {
    observer.observe(element.value);
  }
  onUnmounted(() => {
    if (element.value) {
      observer.unobserve(element.value);
    }
  });
  return {
    unobserve: () => {
      if (element.value) {
        observer.unobserve(element.value);
      }
    }
  };
};

export const useImageLoader = (defaultImage: string) => {
  const isLoaded = ref(false);
  const imageElement = ref<HTMLImageElement | null>(null);

  const loadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = src;
    });
  };

  const handleImageLoad = async (dataSrc: string) => {
    try {
      await loadImage(dataSrc);
      if (imageElement.value) {
        imageElement.value.src = dataSrc;
        isLoaded.value = true;
      }
    } catch {
      if (imageElement.value) {
        imageElement.value.src = defaultImage;
      }
    }
  };

  return {
    isLoaded,
    imageElement,
    handleImageLoad,
  };
};
