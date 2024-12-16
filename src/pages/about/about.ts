 import './about.css'



 export class AboutController {

     constructor() {
         window.addEventListener('scroll', this.progressBar);
     }
     private progressBar(): void {
         const line = document.getElementById('line');
         if (!line) return;
         const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
         const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
         const width_progress_line = (windowScroll / windowHeight) * 100;
         line.style.width = width_progress_line + '%';
     }

     public initializeAboutPage(): void {
         console.log(window.origin)
     }

 }

 export const aboutController = new AboutController();
 aboutController.initializeAboutPage();