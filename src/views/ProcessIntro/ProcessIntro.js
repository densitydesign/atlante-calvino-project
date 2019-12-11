import React from 'react'

import CategoryEntryBlock from '../CategoryEntryBlock/CategoryEntryBlock';
import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';

export default class ProcessIntro extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerCompassHeader />
        <div className="category-intro-grid">
          <div>
            <h2>IL PROCESSO</h2>
            <p>Al centro dell'idea di letteratura in Calvino sta il concetto di metamorfosi. Trasformare è il verbo che meglio rappresenta il complesso
              legame tra cose, parole e immagini che la scritura mette in scena sotto i nostri occhi. D'altra parte ogni trasformazione conduce a un processo
              di ricombinazione. L'arte di combinare tra loro segmenti di realtà e di racconto, moduli narrativi e insiemi di figure è quella che Calvino ha praticato
              per tutta la vita. Senza dimenticarsi di dubitare ogni volta di quello che si sta facendo, per poter ricominciare.
            </p>
          </div>
          <div className="category-subgrid">
            <CategoryEntryBlock smallTitle="dubbio" title="Cancellazione" description="Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße. Ich bin allein und freue mich meines Lebens in dieser Gegend, die für solche Seelen geschaffen ist wie die meine. Ich bin so glücklich, mein Bester, so ganz in dem Gefühle von ruhigem Dasein versunken, daß meine Kunst darunter leidet. Ich könnte jetzt nicht zeichnen, nicht einen Strich, und bin nie ein größerer Maler gewesen als in diesen Augenblicken. Wenn das liebe Tal um mich dampft, und die hohe Sonne an der Oberfläche der undurchdringlichen Finsternis meines Waldes ruht, und nur einzelne Strahlen sich in das innere Heiligtum stehlen, ich dann im hohen Grase am fallenden Bache liege, und näher an der Erde" />
            <CategoryEntryBlock smallTitle="spazio" title="Realismo" description="wenn ich das Wimmeln der kleinen Welt zwischen Halmen, die unzähligen, unergründlichen Gestalten der Würmchen, der Mückchen näher an meinem Herzen fühle, und fühle die Gegenwart des Allmächtigen, der uns nach seinem Bilde schuf, das Wehen des Alliebenden, der uns in ewiger Wonne schwebend trägt und erhält; mein Freund! Wenn’s dann um meine Augen dämmert, und die Welt um mich her und der Himmel ganz in meiner Seele ruhn wie die Gestalt einer Geliebten – dann sehne ich mich oft und denke : ach könntest du das wieder ausdrücken, könntest du dem Papiere das einhauchen, was so voll, so warm in dir lebt, daß es würde der Spiegel deiner Seele, wie deine Seele ist der Spiegel des unendlichen Gottes! – mein Freund – aber ich gehe darüber zugrunde, ich erliege unter der Gewalt der Herrlichkeit dieser Erscheinungen." />
            <CategoryEntryBlock smallTitle="forma" title="Trama" description="Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen Mäxchens Vögel Rüben, Joghurt und Quark. „Fix, Schwyz!“ quäkt Jürgen blöd vom Paß. Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich. Falsches Üben von Xylophonmusik quält jeden größeren Zwerg. Heizölrückstoßabdämpfung. Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen Mäxchens Vögel Rüben, Joghurt und Quark. „Fix, Schwyz!“ quäkt Jürgen blöd vom Paß. Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich. Falsches Üben von Xylophonmusik quält jeden größeren Zwergblah blah" />
          </div>
        </div>
      </>
    );
  }
}