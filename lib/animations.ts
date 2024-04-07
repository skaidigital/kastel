export const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
      duration: 0.3
    }
  }
};

export const rightFadeAnimation = {
  hidden: {
    x: '10%',
    opacity: 0,
    transition: {
      duration: 1,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  },
  show: {
    x: '0',
    opacity: 1,
    transition: {
      duration: 2,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  }
};

export const leftFadeAnimation = {
  hidden: {
    x: '-10%',
    opacity: 0,
    transition: {
      duration: 1,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  },
  show: {
    x: '0',
    opacity: 1,
    transition: {
      duration: 2,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  }
};

export const dropdownIconAnimation = {
  open: {
    rotate: 180,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },

  closed: {
    rotate: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  }
};

export const accordionItemAnimation = {
  show: {
    marginTop: '24px',
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 1,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  },
  hide: {
    marginTop: '0px',
    opacity: 0,
    height: 0,
    transition: {
      duration: 1,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  }
};

export const staggerChildrenAnimation = {
  show: {
    transition: {
      duration: 1,
      ease: [0.19, 1.0, 0.22, 1.0],
      staggerChildren: 0.2
    }
  },

  hide: {
    transition: {
      duration: 1,
      ease: [0.19, 1.0, 0.22, 1.0],
      staggerChildren: 0.1,
      staggerDirection: -1,
      delay: 0.5
    }
  }
};

export const fadeAnimation = {
  show: {
    opacity: 1,
    transition: {
      duration: 0.1,
      ease: 'linear',
      when: 'beforeChildren'
    }
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: 'linear',
      when: 'beforeChildren'
    }
  }
};

export const popupAnimation = {
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  },
  hide: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  }
};

export const slightFadeAndMoveUpAnimation = (index: number) => {
  if (index) {
    return {
      show: {
        y: '0%',
        opacity: 1,
        transition: {
          duration: index === 0 ? 0.25 : 0.25 / (index / index),
          ease: 'easeOut',
          when: 'beforeChildren'
        }
      },
      hide: {
        y: '5%',
        opacity: 0,
        transition: {
          duration: 0.1,
          ease: [0.19, 1.0, 0.22, 1.0],
          when: 'beforeChildren'
        }
      }
    };
  } else {
    return {
      show: {
        y: '0%',
        opacity: 1,
        transition: {
          duration: 0.25,
          ease: 'easeOut',
          when: 'beforeChildren'
        }
      },
      hide: {
        y: '10%',
        opacity: 0,
        transition: {
          duration: 0.1,
          ease: [0.19, 1.0, 0.22, 1.0],
          when: 'beforeChildren'
        }
      }
    };
  }
};

export const leftDrawerAnimation = {
  show: {
    x: '0%',
    transition: {
      duration: 1,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  },
  hide: {
    x: '-100%',
    transition: {
      duration: 1,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  }
};

export const rightDrawerAnimation = {
  show: {
    x: '0%',
    transition: {
      duration: 1,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  },
  hide: {
    x: '100%',
    transition: {
      duration: 1,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  }
};

export const bottomDrawerAnimation = {
  show: {
    y: '0%',
    transition: {
      duration: 1,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  },
  hide: {
    y: '100%',
    transition: {
      duration: 1,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  }
};

export const backdropAnimation = {
  show: {
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.75,
      ease: [0.19, 1.0, 0.22, 1.0]
    }
  }
};
