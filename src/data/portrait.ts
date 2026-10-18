export const portrait = {
  photo: "/profesionaltony.jpg",
  width: 1200,
  height: 1600,
  // Source-pixel crop keeps the real face and ceremony context, with no bitmap edits.
  crop: { x: 320, y: 400, width: 660, height: 550 },
};

export const portraitImageStyle = {
  width: `${(portrait.width / portrait.crop.width) * 100}%`,
  left: `${(-portrait.crop.x / portrait.crop.width) * 100}%`,
  top: `${(-portrait.crop.y / portrait.crop.height) * 100}%`,
};
