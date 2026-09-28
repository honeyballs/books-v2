import { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import "../styles/imprint.scss"

const ImprintPage: React.FC<PageProps> = () => {

   return (
      <main>
         <div className="main-content">
            <div id="imprint-box">
               <h1>Imprint</h1>
               <p>Information according to § 5 TMG</p>
               <p>
                  Yannick Bals
                  <br></br>
                  dev.yannick.bals@gmail.com
               </p>
               <h2>
                  Disclaimer of liability
               </h2>
               <h3>
                  Liability for links
               </h3>
               <p>
                  Our website contains links to external third-party websites over whose content we have no influence. Therefore, we cannot accept any liability for this third-party content. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. However, permanent monitoring of the content of the linked pages is not reasonable without concrete evidence of an infringement. If we become aware of any legal infringements, we will remove such links immediately.
               </p>
               <h3>
                  Copyright
               </h3>
               <p>
                  The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution and any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, please inform us accordingly. If we become aware of any infringements, we will remove such content immediately.
               </p>
            </div>
         </div>
      </main>);
}

export default ImprintPage;

export const Head: HeadFC = () => <title>Imprint | bals.io</title>

