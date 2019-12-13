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
    this.panelClicked = this.panelClicked.bind(this);
  }

  componentDidUpdate()
  {
//    this.refs.fishbones.getDOMNode().focus();    
  }

  getSelectedPanel()
  {
    return this.state.selectedPanel;
  }

  setSelectedPanel(selectedPanel)
  {
    this.state.selectedPanel = selectedPanel;
  }

  panelClicked(panelId)
  {
    this.setState({ selectedPanel : panelId });
console.log("panelClicked : ", panelId);    
  }

  render()
  {
console.log("render compass");    
    return (
      <div>
        <HamburgerIntroHeader />

          <div className="compass-main-description">
            <h1>Bussola</h1>
            <div>The quick brown fox jumps over the lazy old dog. Oft werden in Typoblindtexte auch fremdsprachige Satzteile eingebaut (AVAIL® and Wefox™ are testing aussi la Kerning), um die Wirkung in anderen Sprachen zu testen. In Lateinisch sieht zum Beispiel fast jede Schrift gut aus. Quod erat demonstrandum. Seit 1975 fehlen in den meisten Testtexten die Zahlen, weswegen nach TypoGb. 204 § ab dem Jahr 2034 Zahlen in 86 der Texte zur Pflicht werden. Nichteinhaltung wird mit bis zu 245 € oder 368 $ bestraft. Genauso wichtig in sind mittlerweile auch Âçcèñtë, die in neueren Schriften aber fast immer enthalten sind. Ein wichtiges aber schwierig zu integrierendes Feld sind OpenType-Funktionalitäten.</div>
          </div>
          <div>
            <SlidingPanel id="1" open={this.state.selectedPanel >= 1} zIndex="1" openClassName="panel1-open" closedClassName="panel1-closed" title="Lische" getSelectedPanel={this.getSelectedPanel} setSelectedPanel={this.setSelectedPanel} panelClicked={this.panelClicked} text="Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen" />
            <SlidingPanel id="2" open={this.state.selectedPanel >= 2} zIndex="2" openClassName="panel2-open" closedClassName="panel2-closed" title="Sinuosa" getSelectedPanel={this.getSelectedPanel} setSelectedPanel={this.setSelectedPanel} panelClicked={this.panelClicked} text="Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen Mäxchens Vögel Rüben, Joghurt und Quark. „Fix, Schwyz!“ quäkt Jürgen blöd vom Paß. Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich. Falsches Üben von Xylophonmusik quält jeden größeren Zwerg. Heizölrückstoßabdämpfung.Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich." />
            <SlidingPanel id="3" open={this.state.selectedPanel >= 3} zIndex="3" openClassName="panel3-open" closedClassName="panel3-closed" title="Reti" getSelectedPanel={this.getSelectedPanel} setSelectedPanel={this.setSelectedPanel} panelClicked={this.panelClicked} text="Seit 1975 fehlen in den meisten Testtexten die Zahlen, weswegen nach TypoGb. 204 § ab dem Jahr 2034 Zahlen in 86 der Texte zur Pflicht werden. Nichteinhaltung wird mit bis zu 245 € oder 368 $ bestraft. Genauso wichtig in sind mittlerweile auch Âçcèñtë, die in neueren Schriften aber fast immer enthalten sind. Ein wichtiges aber schwierig zu integrierendes Feld sind OpenType-Funktionalitäten. Je nach Software und Voreinstellungen können eingebaute Kapitälchen, Kerning oder Ligaturen (sehr pfiffig) nicht richtig dargestellt werden.Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen." />
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