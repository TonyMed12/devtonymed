// Declarations for the React Bits components copied as JavaScript (see each file's header for its licence).
declare module "*.jsx" {
  const Component: (props: Record<string, unknown>) => import("react").ReactElement | null;
  export default Component;
}
