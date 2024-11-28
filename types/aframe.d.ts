import "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "a-scene": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "a-box": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>, 
        HTMLElement
      > & {
        position?: string;
        rotation?: string;
        color?: string;
        animation?: string;
      };
      "a-plane": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>, 
        HTMLElement
      > & {
        position?: string;
        rotation?: string;
        width?: string;
        height?: string;
        color?: string;
      };
      "a-light": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        type?: string;
        position?: string;
      };
      "a-camera": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        type?: string;
        position?: string;
      };
      "a-cursor": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "a-text": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>, 
        HTMLElement
      > & {
        value?: string;
        position?: string;
        align?: string;
        color?: string;
      };
      "a-sky": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>& {
        src?: string;
        radius?: string;
        rotation?: string;
        color?: string;
      };
      "a-torus": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>& {
        color?: string;
        radius?: string;
        rotation?: string;
        color?: string;
        arc:string;
        position:string;
        material:string;
      };

      "a-cylinder": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>& {
        color?: string;
        radius?: string;
        position:string;
        height:string;
      };


      // Agrega más etiquetas según sea necesario
    }
  }
}
