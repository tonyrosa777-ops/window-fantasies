"use client";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import type { WorkItem } from "@/data/site";

/**
 * PortfolioLightbox - shared full-frame viewer for the portfolio reel + wall.
 * yet-another-react-lightbox ships keyboard nav, swipe, focus trap, and
 * backdrop-close (the JCM hand-rolled modal shipped without keyboard support,
 * which is why this is a library, not custom code). The item blurb lives HERE,
 * off the tiles: tiles stay photo-first, prose appears on tap.
 */

interface Props {
  items: WorkItem[];
  index: number;
  onClose: () => void;
}

export function PortfolioLightbox({ items, index, onClose }: Props) {
  return (
    <Lightbox
      open={index >= 0}
      close={onClose}
      index={index < 0 ? 0 : index}
      slides={items.map((item) => ({
        src: item.image,
        width: item.w,
        height: item.h,
        alt: item.alt,
        title: item.brand,
        description: `${item.category} · ${item.room}. ${item.blurb}`,
      }))}
      plugins={[Zoom, Captions]}
      captions={{ descriptionTextAlign: "center" }}
      styles={{ container: { backgroundColor: "rgba(10, 8, 6, 0.96)" } }}
      animation={{ fade: 400, swipe: 400 }}
      controller={{ closeOnBackdropClick: true }}
    />
  );
}
