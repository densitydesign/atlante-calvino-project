import React from 'react'
import HamburgerIntroHeader from '../../headers/HamburgerIntroHeader/HamburgerIntroHeader';
import SlidingPanel from '../../general/SlidingPanel/SlidingPanel';

import './Compass.css';

export default class Compass extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = { selectedPanel : 1 };

    this.getSelectedPanel = this.getSelectedPanel.bind(this);
    this.setSelectedPanel = this.setSelectedPanel.bind(this);
  }

  componentDidUpdate()
  {
    this.refs.fishbones.getDOMNode().focus();    
  }

  getSelectedPanel()
  {
    return this.state.selectedPanel;
  }

  setSelectedPanel(selectedPanel)
  {
    this.state.selectedPanel = selectedPanel;
  }

  render()
  {
    return (
      <div>
        <HamburgerIntroHeader />

          <div id="compass">
            <h1>Bussola</h1>
          </div>
          <div>
            <SlidingPanel id="1" background="lightgray" open="true" zIndex="1" right="-180" title="Lische" getSelectedPanel={this.getSelectedPanel} setSelectedPanel={this.setSelectedPanel} text="Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen" />
            <SlidingPanel id="2" background="yellow" open="false" zIndex="2" right="-260" title="Sinuosa" getSelectedPanel={this.getSelectedPanel} setSelectedPanel={this.setSelectedPanel} text="Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen Mäxchens Vögel Rüben, Joghurt und Quark. „Fix, Schwyz!“ quäkt Jürgen blöd vom Paß. Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich. Falsches Üben von Xylophonmusik quält jeden größeren Zwerg. Heizölrückstoßabdämpfung.Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich." />
            <SlidingPanel id="3" background="lightgreen" open="false" zIndex="3" right="-340%" title="Reti" getSelectedPanel={this.getSelectedPanel} setSelectedPanel={this.setSelectedPanel} text="Seit 1975 fehlen in den meisten Testtexten die Zahlen, weswegen nach TypoGb. 204 § ab dem Jahr 2034 Zahlen in 86 der Texte zur Pflicht werden. Nichteinhaltung wird mit bis zu 245 € oder 368 $ bestraft. Genauso wichtig in sind mittlerweile auch Âçcèñtë, die in neueren Schriften aber fast immer enthalten sind. Ein wichtiges aber schwierig zu integrierendes Feld sind OpenType-Funktionalitäten. Je nach Software und Voreinstellungen können eingebaute Kapitälchen, Kerning oder Ligaturen (sehr pfiffig) nicht richtig dargestellt werden.Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen." />
          </div>
{/*          
          <div>
            <SlidingPanel open="true">
              Lische<br />
              Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen
            </SlidingPanel>
            <SlidingPanel open="false">
              Sinuosa<br />
              Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen Mäxchens Vögel Rüben, Joghurt und Quark. „Fix, Schwyz!“ quäkt Jürgen blöd vom Paß. Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich. Falsches Üben von Xylophonmusik quält jeden größeren Zwerg. Heizölrückstoßabdämpfung.Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. 
            </SlidingPanel>
            <SlidingPanel open="false">
              Reti<br />
              Seit 1975 fehlen in den meisten Testtexten die Zahlen, weswegen nach TypoGb. 204 § ab dem Jahr 2034 Zahlen in 86 der Texte zur Pflicht werden. Nichteinhaltung wird mit bis zu 245 € oder 368 $ bestraft. Genauso wichtig in sind mittlerweile auch Âçcèñtë, die in neueren Schriften aber fast immer enthalten sind. Ein wichtiges aber schwierig zu integrierendes Feld sind OpenType-Funktionalitäten. Je nach Software und Voreinstellungen können eingebaute Kapitälchen, Kerning oder Ligaturen (sehr pfiffig) nicht richtig dargestellt werden.Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. 
            </SlidingPanel>
          </div>
*/}
{/*          
          <div id="fishbones" ref={ fishbones => this.fishbones = fishbones }>Lische</div>
          <div id="winding">Sinuosa</div>
          <div id="networks">Reti</div>
*/}    
      </div>
    );
  }
}