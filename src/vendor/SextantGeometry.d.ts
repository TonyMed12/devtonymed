export type SpherePoint = [number, number, number];
export type GlobeCamera = { c1: number; s1: number; c2: number; s2: number };
export function engraving(gap: number): { lat: number; a: number; b: number }[];
export function onSphere(lat: number, lng: number): SpherePoint;
export function camera(lng: number, lat: number): GlobeCamera;
export function look(point: SpherePoint, camera: GlobeCamera): SpherePoint;
