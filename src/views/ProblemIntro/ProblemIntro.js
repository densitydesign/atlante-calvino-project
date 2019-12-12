import React from 'react'

import CategoryEntryBlock from '../CategoryEntryBlock/CategoryEntryBlock';
import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';

import '../../App.css';

export default class ProblemIntro extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerCompassHeader />
        <div className="category-intro-grid">
          <div className="category-intro-block-row">
            <div className="category-intro-main-block">
              <small className="current-phase-subheader"><strong>FASE 3</strong></small>
              <h1>IL PROBLEMA</h1>
              <p>Il problema del realismo accompagna tutti i narratori moderni, Calvino incluso, che si è formato in un'epoca di neo-realismo e poi
                se ne è allontanato anni-luce. Ma senza mai riuscire a superare il tormento che lega la descrizione del mondo alla costruzione di una trama.
                Trama che per Calvino tende spesso a prendere una forma modulare piuttosto che progressiva: legata all'incremento potenzialmente infinito della
                serie, ma anche sottoposta al minaccioso spettro della cancellazione.
              </p>
            </div>
            <div className="other-phases-subheader" >
              <ArrowButton arrowDirection="left" textAlign="right" text="FASE 1" route="/Phenomena/intro" />
              <ArrowButton arrowDirection="left" textAlign="left" text="FASE 2" route="/Process/intro" />
            </div>
          </div>
          <div className="category-subentries-grid">
            <CategoryEntryBlock smallTitle="dubbio" title="Cancellazione" description="Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße. Ich bin allein und freue mich meines Lebens in dieser Gegend, die für solche Seelen geschaffen ist wie die meine. Ich bin so glücklich, mein Bester, so ganz in dem Gefühle von ruhigem Dasein versunken, daß meine Kunst darunter leidet. Ich könnte jetzt nicht zeichnen, nicht einen Strich, und bin nie ein größerer Maler gewesen als in diesen Augenblicken. Wenn das liebe Tal um mich dampft, und die hohe Sonne an der Oberfläche der undurchdringlichen Finsternis meines Waldes ruht, und nur einzelne Strahlen sich in das innere Heiligtum stehlen, ich dann im hohen Grase am fallenden Bache liege, und näher an der Erde" />
            <CategoryEntryBlock smallTitle="spazio" title="Realismo" description="wenn ich das Wimmeln der kleinen Welt zwischen Halmen, die unzähligen, unergründlichen Gestalten der Würmchen, der Mückchen näher an meinem Herzen fühle, und fühle die Gegenwart des Allmächtigen, der uns nach seinem Bilde schuf, das Wehen des Alliebenden, der uns in ewiger Wonne schwebend trägt und erhält; mein Freund! Wenn’s dann um meine Augen dämmert, und die Welt um mich her und der Himmel ganz in meiner Seele ruhn wie die Gestalt einer Geliebten – dann sehne ich mich oft und denke : ach könntest du das wieder ausdrücken, könntest du dem Papiere das einhauchen, was so voll, so warm in dir lebt, daß es würde der Spiegel deiner Seele, wie deine Seele ist der Spiegel des unendlichen Gottes! – mein Freund – aber ich gehe darüber zugrunde, ich erliege unter der Gewalt der Herrlichkeit dieser Erscheinungen." />
            <CategoryEntryBlock smallTitle="forma" title="Trama" description="Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen Mäxchens Vögel Rüben, Joghurt und Quark. „Fix, Schwyz!“ quäkt Jürgen blöd vom Paß. Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich. Falsches Üben von Xylophonmusik quält jeden größeren Zwerg. Heizölrückstoßabdämpfung. Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen Mäxchens Vögel Rüben, Joghurt und Quark. „Fix, Schwyz!“ quäkt Jürgen blöd vom Paß. Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich. Falsches Üben von Xylophonmusik quält jeden größeren Zwergblah blah" />            
          </div>
        </div>
      </>
    );
  }
}