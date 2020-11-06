import React, { Component } from 'react';
import SheetStyles from '../SheetStyles.module.css';
import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';

import context_webm_1x from './animation-text-context@1x.webm';
import context_mp4_1x from './animation-text-context@1x.mp4';
import context_webm_2x from './animation-text-context@2x.webm';
import context_mp4_2x from './animation-text-context@2x.mp4';

import distribution from './distribution.svg';
import miniviz from './miniviz.svg';
import legend from './legend.svg';

import section01 from './section01.svg';
import section02 from './section02.svg';
import section03 from './section03.svg';
import section04 from './section04.svg';

import visualizationPDF from './muro-di-testo-avventura-di-un-soldato.pdf';

class CancellationInformationSheet extends Component {
  render() {
    console.log(window.devicePixelRatio)
    return <>
      <HamburgerCompassHeader />
      <main className={SheetStyles.main}>
        <div className={SheetStyles.gridRow}>
          <h4 className="ac-breadcrumb">Tappa 3 > cancellare</h4>
          <h1 className={SheetStyles.titleH1}>L'avventura di un soldato</h1>
          <h2 className={SheetStyles.titleH2}>L'idea</h2>
          <p className={SheetStyles.paragraph}>
            Spiegare perché si è scelto il racconto L’avventura di un soldato; introdurlo, parlare della distribuzione delle occorrenze di td rispetto alla griglia. Valutare complessivamente la visualizzazione per spiegare in che modo verrà svolta l’analisi, in base a cosa è stato “suddiviso” il testo.<br/><br/>
            Aenean placerat urna in malesuada laoreet. Suspendisse feugiat elit sit amet mattis tristique. Phasellus accumsan interdum turpis vitae ultricies. Mauris id vehicula ante, id fermentum est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam nec finibus urna, non tristique libero. Nullam et semper elit. Cras ut neque quis est porttitor laoreet. Phasellus placerat placerat ligula eget egestas. Nullam posuere diam quis lectus bibendum egestas. Praesent suscipit, massa quis porta aliquet, nisi turpis ultricies mi, venenatis blandit justo felis quis turpis. Vivamus velit tortor, ornare vitae massa a, dapibus ultricies odio. Nunc dictum quis metus non interdum.
          </p>
          <div className={SheetStyles.sideContent}>
            <div className={SheetStyles.image} style={{backgroundColor:'#dfe3e5',borderRadius:3}}>
              <video style={{width:'50%',marginLeft:'25%'}} autoPlay muted loop>
                <source type="video/webm" src={window.devicePixelRatio>1?context_webm_2x:context_webm_1x} />
                <source type="video/mp4" src={window.devicePixelRatio>1?context_mp4_2x:context_mp4_1x} />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="captionLeft">
              Posizione del racconto in [titolo viz fase 3]
            </p>
            <img className={SheetStyles.image+' '+SheetStyles.image100w} src={distribution} style={{border:'0.5px solid #333333'}} />
            <p className="captionLeft">
              Distribuzione delle categorie nel racconto.
            </p>
          </div>
        </div>
        <div className={SheetStyles.gridRow}>
          <h2 className={SheetStyles.titleH2}>L'analisi</h2>
          <h3 className={SheetStyles.titleH3}>Testo dubitativo all'interno del racconto</h3>
          <p className={SheetStyles.paragraph}>
            In questa scheda abbiamo scelto di avvicinarci al testo. Non potendo però riprodurlo per motivi legati alla proprietà el diritto di autore, abbiamo introdotto questa visualizzazione che segue.<br/>
            Sed iaculis ante id dolor condimentum lacinia. Nullam ut consectetur neque. Pellentesque pulvinar vel lacus vitae feugiat.<br/><br/>
            Pellentesque efficitur, magna ut lobortis placerat, orci nulla blandit risus, vel bibendum arcu ante sed orci. Sed sed nibh sagittis, elementum lorem ac, pretium lacus. Maecenas ultrices ligula ut accumsan venenatis. Proin vitae est pulvinar, pulvinar neque nec, semper metus. Nulla lobortis malesuada tortor vel dapibus. Fusce urna diam, cursus non posuere sit amet, blandit nec nisi. Maecenas in magna id mauris pretium mollis. Proin eget mattis ex. Proin tincidunt facilisis nulla sit amet lacinia. Fusce rutrum viverra metus, at vulputate metus blandit eget. Aliquam pharetra, turpis vitae semper ultricies, lorem augue vulputate leo, faucibus pretium tortor nibh non orci.<br/><br/>
            Ecco come leggere la visualizzazione.
          </p>
          <div className={SheetStyles.sideContent} style={{ textAlign:'center' }}>
            <img className={SheetStyles.image} src={miniviz} style={{position:'sticky',top:'var(--navigation-height)'}}/>
          </div>
        </div>
        <div className={SheetStyles.gridRow}>

          <img className={SheetStyles.image+' '+SheetStyles.translucentBackground} src={legend} style={{ borderBottom: '1px solid #5151fc', gridColumn:'1 / span 12', marginBottom:'1rem', position:'sticky', top:'calc(var(--navigation-height) - 0px)',width:'100%'}} />

          <img className={SheetStyles.image} src={section01} style={{gridColumn:'1 / span 12',width:'100%'}}/>
          <p className={SheetStyles.paragraphCentered} style={{marginTop:'1rem'}}>
            <b>L’avvenimento</b> è placerat urna in malesuada laoreet. Suspendisse feugiat elit sit amet mattis tristique. Phasellus accumsan interdum turpis vitae ultricies. Mauris id vehicula ante, id fermentum est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam nec finibus urna, non tristique libero. Nullam et semper elit. Cras ut neque quis est porttitor laoreet. Phasellus placerat placerat ligula eget egestas. Nullam posuere diam quis lectus bibendum egestas. Praesent suscipit, massa quis porta aliquet, nisi turpis ultricies mi, venenatis blandit justo felis quis turpis. Vivamus velit tortor, ornare vitae massa a, dapibus ultricies odio. Nunc dictum quis metus non interdum.<br/><br/>
            Quisque ornare felis nec sollicitudin tincidunt. Nullam pretium volutpat nunc vitae dignissim. Maecenas vel cursus ex. Fusce posuere lectus ut accumsan laoreet. Cras eget justo blandit, posuere lacus nec, suscipit sem. Suspendisse nisi purus, maximus quis nisl at, dapibus ultrices magna. Duis euismod nibh quis ipsum vehicula, tempus sodales dolor facilisis. Sed sed nulla eget odio porttitor volutpat.
          </p>
          <img className={SheetStyles.image} src={section02} style={{gridColumn:'1 / span 12',marginBottom:'1rem',width:'100%'}}/>
          <p className={SheetStyles.paragraphCentered} style={{marginTop:'1rem'}}>
            <b>«Ora bisognava ricominciare da capo»</b> è la seconda parte dell’analisi. Forse è un po’ lunga, eventualmente si potrebbe spezzare in due? Quisque ornare felis nec sollicitudin tincidunt. Nullam pretium volutpat nunc vitae dignissim. Maecenas vel cursus ex. Fusce posuere lectus ut accumsan laoreet. Cras eget justo blandit, posuere lacus nec, suscipit sem. Suspendisse nisi purus, maximus quis nisl at, dapibus ultrices magna. Duis euismod nibh quis ipsum vehicula, tempus sodales dolor facilisis. Sed sed nulla eget odio porttitor volutpat. Sed et tempor magna, non tempus quam. Fusce vitae efficitur augue. Integer sollicitudin faucibus mi vel gravida. Nulla enim odio, efficitur id dolor non, luctus interdum risus. Sed dictum maximus eleifend. Nulla efficitur tincidunt molestie.
          </p>
          <img className={SheetStyles.image} src={section03} style={{gridColumn:'1 / span 12',marginBottom:'1rem',width:'100%'}}/>
          <p className={SheetStyles.paragraphCentered} style={{marginTop:'1rem'}}>
            <b>La galleria</b> è la terza parte, qui succede che quisque ornare felis nec sollicitudin tincidunt. Nullam pretium volutpat nunc vitae dignissim. Maecenas vel cursus ex. Fusce posuere lectus ut accumsan laoreet. Cras eget justo blandit, posuere lacus nec, suscipit sem. Suspendisse nisi purus, maximus quis nisl at, dapibus ultrices magna. Duis euismod nibh quis ipsum vehicula, tempus sodales dolor facilisis. Sed sed nulla eget odio porttitor volutpat. Sed et tempor magna, non tempus quam. Fusce vitae efficitur augue. Integer sollicitudin faucibus mi vel gravida. Nulla enim odio, efficitur id dolor non, luctus interdum risus. Sed dictum maximus eleifend. Nulla efficitur tincidunt molestie. Etiam id commodo turpis. Nullam viverra, felis in varius faucibus, risus nunc rhoncus nisl, quis ornare justo odio vitae tortor.
          </p>
          <img className={SheetStyles.image} src={section04} style={{gridColumn:'1 / span 12',marginBottom:'1rem',width:'100%'}}/>
          <p className={SheetStyles.paragraphCentered} style={{marginTop:'1rem'}}>
            Infine tutto si conclude senza sapere se… Calvino, scegliendo <b>l'omissione</b> di alcuni fatti, instaura nuovamente un dubbio nella mente del lettore. Questa volta, però, lo fa senza senza aggiungere parole, ma togliendo elementi dalla narrazione e intrecciando il dubbio con la curiosità. In vel vehicula ligula, sit amet tempus nisi. Aliquam ipsum elit, gravida elementum purus eget, condimentum viverra massa. Aliquam sit amet tortor eu tortor congue mollis auctor a leo. Vestibulum sit amet odio id orci auctor cursus quis sed eros. Etiam tempor risus ipsum, at iaculis turpis mollis a. Fusce quis quam et odio efficitur vehicula non a urna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum dignissim feugiat dapibus. Donec imperdiet purus sit amet mauris dignissim placerat. Cras consequat aliquet erat, vitae rhoncus leo ultrices eget. Pellentesque tempor nulla metus, sed consectetur neque blandit eget. Curabitur cursus libero vitae leo viverra, ut gravida purus feugiat.
          </p>
        </div>
        <div className={SheetStyles.gridRow}>
          <h2 className={SheetStyles.titleH2}>Conclusioni</h2>
          <p className={SheetStyles.paragraph}>
          Suspendisse nisi purus, maximus quis nisl at, dapibus ultrices magna. Duis euismod nibh quis ipsum vehicula, tempus sodales dolor facilisis. Sed sed nulla eget odio porttitor volutpat. Sed et tempor magna, non tempus quam. Fusce vitae efficitur augue. Integer sollicitudin faucibus mi vel gravida. Nulla enim odio, efficitur id dolor non, luctus interdum risus. Sed dictum maximus eleifend. Nulla efficitur tincidunt molestie. Etiam id commodo turpis.<br/>
          <a href={visualizationPDF} download>Scarica la visualizzazione completa</a> oppure <a href="https://observablehq.com/@iosonosempreio/muro-del-dubbio">scopri il dietro le quinte</a>.
          </p>
        </div>
        <div className={SheetStyles.gridRow}>
          <h2 className={SheetStyles.titleH2}>Bibliografia</h2>
          <ol className={SheetStyles.paragraph+' references'}>
              <li className='referenceItem'>
                Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer.
              </li>
              <li className='referenceItem'>
                Linke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys.
              </li>
              <li className='referenceItem'>
                Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer.
              </li>
              <li className='referenceItem'>
                Linke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys.
              </li>
            </ol>
        </div>
        <div className={SheetStyles.gridRow}>
          <div style={{gridColumn:'1 / span 3'}}><ArrowButton arrowDirection="none" textAlign="left" text="RITORNA ALL'ANALISI" route="/doubt/phase3" /></div>
          <div style={{gridColumn:'4 / span 2'}}><ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/phase2-process" /></div>
          <div style={{gridColumn:'6 / span 2'}}><ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/phase3-problem" /></div>
        </div>
      </main>
    </>;
  }
}

export default CancellationInformationSheet;
