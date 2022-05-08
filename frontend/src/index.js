import React from 'react';
import ReactDOM from 'react-dom';
import Mermaid from 'mermaid';
import update from 'immutability-helper';
import axios from 'axios';
import './index.css';

function Delete(props) {
    return (
        <button className="delete" onClick={props.delete}>Delete {props.name}</button>
    )
}

function Add(props) {
    return (
        <button className="add" onClick={props.add}>Add {props.name}</button>
    )
}

function CardRank(props) {
    return (
        <label>
            Rank:
            <input type="text" value={props.rank} onChange={r => props.setRank(r.target.value)} />
        </label>
    )
}


function CardSuit(props) {
    return (
        <label>
            Suit: 
            <input type="text" value={props.suit} onChange={s => props.setSuit(s.target.value)} />
        </label>
    )
}


function Card(props) {
    return (
        <div>
            <h5>Card {props.id}</h5>
            <Delete delete={props.delete} name="Card"/>
            <div className="card"> 
                <CardRank rank={props.rank} setRank={r => props.setRank(r)} />
                <CardSuit suit={props.suit} setSuit={s => props.setSuit(s)} />
            </div>
        </div>
    )
}

function MinMax(props) {
    return (
        <div className="minMax">
            <label>
                Min:
                <input type="number" value={props.min} onChange={m => props.setMin(m.target.value)} />
            </label>
            <label>
                Max:
                <input type="number" value={props.max} onChange={m => props.setMax(m.target.value)} />
            </label>
        </div>
    )
}

function KeyCardGroup(props) {
    return (
        <div>
            <h4>Key Card Group {props.id}</h4>
            <Delete delete={props.delete} name="Key Card Group" />
            <div className="keyCardGroup">
                <div className="cards">
                    {props.cards && props.cards.map(card => 
                        <Card key={card.id.toString()}
                            id={card.id}
                            rank={card.rank}
                            setRank={r => props.setRank(card.id, r)}
                            suit={card.suit}
                            setSuit={s => props.setSuit(card.id, s)}
                            delete={_ => props.deleteCard(card.id)}
                        />
                    )}
                </div>
                <Add add={props.addCard} name="Card" />
                <MinMax min={props.min} setMin={props.setMin} max={props.max} setMax={props.setMax} />
            </div>
        </div>
    )
}

function TotalPoints(props) {
    return (
        <div>
            <label>
                Total Points:
                <MinMax min={props.min} setMin={props.setMin} max={props.max} setMax={props.setMax} />
            </label>
        </div>
    )
}

function HighCardPoints(props) {
    return (
        <div>
            <label>
                High Card Points:
                <MinMax min={props.min} setMin={props.setMin} max={props.max} setMax={props.setMax} />
            </label>
        </div>
    )
}

function SuitPoints(props) {
    return (
        <div>
            <label>
                {props.suit}:
                <MinMax min={props.min} setMin={props.setMin} max={props.max} setMax={props.setMax} />
            </label>
        </div>
    )
}

function Rule(props) {
    return (
        <div>
            <h3>Rule {props.id}</h3>
            <Delete delete={props.delete} name="Rule" />
            <div className="rule">
                <label>
                    Destination Node:
                    <input type="number" value={props.destination} onChange={d => props.setDestination(d.target.value)} />
                </label>
                <TotalPoints min={props.minTP} setMin={props.setMinTP} max={props.maxTP} setMax={props.setMaxTP} />
                <HighCardPoints min={props.minHCP} setMin={props.setMinHCP} max={props.maxHCP} setMax={props.setMaxHCP} />
                <div className="suitPoints">
                    <SuitPoints suit="Clubs" min={props.minC} setMin={props.setMinC} max={props.maxC} setMax={props.setMaxC} />
                    <SuitPoints suit="Diamonds" min={props.minD} setMin={props.setMinD} max={props.maxD} setMax={props.setMaxD} />
                    <SuitPoints suit="Hearts" min={props.minH} setMin={props.setMinH} max={props.maxH} setMax={props.setMaxH} />
                    <SuitPoints suit="Spades" min={props.minS} setMin={props.setMinS} max={props.maxS} setMax={props.setMaxS} />
                </div>
                <div className="keyCardGroups">
                    {props.keyCardGroups && props.keyCardGroups.map(keyCardGroup =>
                        <KeyCardGroup key={keyCardGroup.id.toString()}
                            id={keyCardGroup.id}
                            cards={keyCardGroup.cards}
                            setRank={(cardId, r) => props.setRank(keyCardGroup.id, cardId, r)}
                            setSuit={(cardId, s) => props.setSuit(keyCardGroup.id, cardId, s)}
                            deleteCard={cardId => props.deleteCard(keyCardGroup.id, cardId)}
                            addCard={_ => props.addCard(keyCardGroup.id)}
                            min={keyCardGroup.min}
                            setMin={m => props.setKeyCardGroupMin(keyCardGroup.id, m)}
                            max={keyCardGroup.max}
                            setMax={m => props.setKeyCardGroupMax(keyCardGroup.id, m)}
                            delete={_ => props.deleteKeyCardGroup(keyCardGroup.id)}
                        />
                    )}
                </div>
                <Add add={props.addKeyCardGroup} name="Key Card Group" />
            </div>
        </div>
    )
}

function BidNode(props) {
    return (
        <div>
            <h2>Bid Node {props.id}</h2>
            <Delete delete={props.delete} name="Bid Node" />
            <div className="bidNode">
                <label>
                    Bid:
                    <input type="number" value={props.bid} onChange={b => props.setBid(b.target.value)} />
                </label>
                <div className="rules">
                    {props.rules && props.rules.map(rule =>
                        <Rule key={rule.id.toString()}
                            id={rule.id}
                            destination={rule.destination}
                            setDestination={destination => props.setDestination(rule.id, destination)}
                            minTP={rule.minTP}
                            setMinTP={minTP => props.setMinTP(rule.id, minTP)}
                            maxTP={rule.maxTP}
                            setMaxTP={maxTP => props.setMaxTP(rule.id, maxTP)}
                            minHCP={rule.minHCP}
                            setMinHCP={minHCP => props.setMinHCP(rule.id, minHCP)}
                            maxHCP={rule.maxHCP}
                            setMaxHCP={maxHCP => props.setMaxHCP(rule.id, maxHCP)}
                            minC={rule.minC}
                            setMinC={minC => props.setMinC(rule.id, minC)}
                            maxC={rule.maxC}
                            setMaxC={maxC => props.setMaxD(rule.id, maxC)}
                            minD={rule.minD}
                            setMinD={minD => props.setMinD(rule.id, minD)}
                            maxD={rule.maxD}
                            setMaxD={maxD => props.setMaxD(rule.id, maxD)}
                            minH={rule.minH}
                            setMinH={minH => props.setMinH(rule.id, minH)}
                            maxH={rule.maxH}
                            setMaxH={maxH => props.setMaxH(rule.id, maxH)}
                            minS={rule.minS}
                            setMinS={minS => props.setMinS(rule.id, minS)}
                            maxS={rule.maxS}
                            setMaxS={maxS => props.setMaxS(rule.id, maxS)}
                            keyCardGroups={rule.keyCardGroups}
                            setRank={(keyCardGroupId, cardId, r) => props.setRank(rule.id, keyCardGroupId, cardId, r)}
                            setSuit={(keyCardGroupId, cardId, s) => props.setSuit(rule.id, keyCardGroupId, cardId, s)}
                            deleteCard={(keyCardGroupId, cardId) => props.deleteCard(rule.id, keyCardGroupId, cardId)}
                            addCard={keyCardGroupId => props.addCard(rule.id, keyCardGroupId)}
                            setKeyCardGroupMin={(keyCardGroupId, m) => props.setKeyCardGroupMin(rule.id, keyCardGroupId, m)}
                            setKeyCardGroupMax={(keyCardGroupId, m) => props.setKeyCardGroupMax(rule.id, keyCardGroupId, m)}
                            deleteKeyCardGroup={keyCardGroupId => props.deleteKeyCardGroup(rule.id, keyCardGroupId)}
                            addKeyCardGroup={_ => props.addKeyCardGroup(rule.id)}
                            delete={_ => props.deleteRule(rule.id)}
                        />
                    )}
                </div>
                <Add add={props.addRule} name="Rule" />
            </div>
        </div>
    )
}

function Inputs(props) {
    return (
        <div>
            <div className="bidNodes">
                {props.bidNodes && props.bidNodes.map(bidNode =>
                    <BidNode key={bidNode.id.toString()}
                        id={bidNode.id}
                        bid={bidNode.bid}
                        setBid={b => props.setBid(bidNode.id, b)}
                        rules={bidNode.rules}
                        setDestination={(ruleId, destination) => props.setDestination(bidNode.id, ruleId, destination)}
                        setMinTP={(ruleId, minTP) => props.setMinTP(bidNode.id, ruleId, minTP)}
                        setMaxTP={(ruleId, maxTP) => props.setMaxTP(bidNode.id, ruleId, maxTP)}
                        setMinHCP={(ruleId, minHCP) => props.setMinHCP(bidNode.id, ruleId, minHCP)}
                        setMaxHCP={(ruleId, maxHCP) => props.setMaxHCP(bidNode.id, ruleId, maxHCP)}
                        setMinC={(ruleId, minC) => props.setMinC(bidNode.id, ruleId, minC)}
                        setMaxC={(ruleId, maxC) => props.setMaxD(bidNode.id, ruleId, maxC)}
                        setMinD={(ruleId, minD) => props.setMinD(bidNode.id, ruleId, minD)}
                        setMaxD={(ruleId, maxD) => props.setMaxD(bidNode.id, ruleId, maxD)}
                        setMinH={(ruleId, minH) => props.setMinH(bidNode.id, ruleId, minH)}
                        setMaxH={(ruleId, maxH) => props.setMaxH(bidNode.id, ruleId, maxH)}
                        setMinS={(ruleId, minS) => props.setMinS(bidNode.id, ruleId, minS)}
                        setMaxS={(ruleId, maxS) => props.setMaxS(bidNode.id, ruleId, maxS)}
                        setRank={(ruleId, keyCardGroupId, cardId, r) => props.setRank(bidNode.id, ruleId, keyCardGroupId, cardId, r)}
                        setSuit={(ruleId, keyCardGroupId, cardId, s) => props.setSuit(bidNode.id, ruleId, keyCardGroupId, cardId, s)}
                        deleteCard={(ruleId, keyCardGroupId, cardId) => props.deleteCard(bidNode.id, ruleId, keyCardGroupId, cardId)}
                        addCard={(ruleId, keyCardGroupId) => props.addCard(bidNode.id, ruleId, keyCardGroupId)}
                        setKeyCardGroupMin={(ruleId, keyCardGroupId, m) => props.setKeyCardGroupMin(bidNode.id, ruleId, keyCardGroupId, m)}
                        setKeyCardGroupMax={(ruleId, keyCardGroupId, m) => props.setKeyCardGroupMax(bidNode.id, ruleId, keyCardGroupId, m)}
                        deleteKeyCardGroup={(ruleId, keyCardGroupId) => props.deleteKeyCardGroup(bidNode.id, ruleId, keyCardGroupId)}
                        addKeyCardGroup={ruleId => props.addKeyCardGroup(bidNode.id, ruleId)}
                        deleteRule={ruleId => props.deleteRule(bidNode.id, ruleId)}
                        addRule={_ => props.addRule(bidNode.id)}
                        delete={_ => props.deleteBidNode(bidNode.id)}
                    />
                )}
                <Add add={props.addBidNode} name="Bid Node" />
                <button id="generate" onClick={props.generateFlowchart}>Generate Flowchart</button>
            </div>
        </div>
    )
}

function JsonOutput(props) {
    return (
        <div>
            {props.jsonOutput}
        </div>
    )
}

class FlowchartManager extends React.Component {
    constructor(props) {
        super(props);
        this.addBidNode = this.addBidNode.bind(this);
        this.setBid = this.setBid.bind(this);
        this.deleteBidNode = this.deleteBidNode.bind(this);
        this.addRule = this.addRule.bind(this);
        this.setDestination = this.setDestination.bind(this);
        this.setMinTP = this.setMinTP.bind(this);
        this.setMaxTP = this.setMaxTP.bind(this);
        this.setMinHCP = this.setMinHCP.bind(this);
        this.setMaxHCP = this.setMaxHCP.bind(this);
        this.setMinC = this.setMinC.bind(this);
        this.setMaxC = this.setMaxC.bind(this);
        this.setMinD = this.setMinD.bind(this);
        this.setMaxD = this.setMaxD.bind(this);
        this.setMinH = this.setMinH.bind(this);
        this.setMaxH = this.setMaxH.bind(this);
        this.setMinS = this.setMinS.bind(this);
        this.setMaxS = this.setMaxS.bind(this);
        this.deleteRule = this.deleteRule.bind(this);
        this.addKeyCardGroup = this.addKeyCardGroup.bind(this);
        this.setKeyCardGroupMin = this.setKeyCardGroupMin.bind(this);
        this.setKeyCardGroupMax = this.setKeyCardGroupMax.bind(this);
        this.deleteKeyCardGroup = this.deleteKeyCardGroup.bind(this);
        this.addCard = this.addCard.bind(this);
        this.setSuit = this.setSuit.bind(this);
        this.setRank = this.setRank.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.generateFlowchart = this.generateFlowchart.bind(this);
        this.state = {
            bidNodes: [],
            jsonOutput: ""
        };
    }

    addBidNode() {
        let _id = this.state.bidNodes.length > 0 ? this.state.bidNodes.length : 0;
        let bidNodes = update(
            this.state.bidNodes,
            {
                $push: [{
                        id: _id,
                        bid: 0,
                        rules: []
                 }]
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setBid(bidNodeId, bid) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    bid: {$set: bid}
                }
            }
        );
        this.setState({"bidNodes": bidNodes})
    }

    deleteBidNode(bidNodeId) {
        let bidNodes = update(
            this.state.bidNodes,
            {$splice: [[bidNodeId, 1]]}
        );
        this.setState({"bidNodes": bidNodes});
    }

    addRule(bidNodeId) {
        let _id = this.state.bidNodes[bidNodeId].rules.length;
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        $push: [{
                            id: _id,
                            destination: bidNodeId + 1 < this.state.bidNodes.length ? bidNodeId + 1 : this.state.bidNodes.length,
                            minTP: 0,
                            maxTP: 40,
                            minHCP: 0,
                            maxHCP: 37,
                            minC: 0,
                            maxC: 13,
                            minD: 0,
                            maxD: 13,
                            minH: 0,
                            maxH: 13,
                            minS: 0,
                            maxS: 13,
                            keyCardGroups: []
                        }]
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setDestination(bidNodeId, ruleId, destination) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "destination": {$set: destination}
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setMinTP(bidNodeId, ruleId, minTP) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "minTP": {$set: minTP}
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setMaxTP(bidNodeId, ruleId, maxTP) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "maxTP": {$set: maxTP}
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setMinHCP(bidNodeId, ruleId, minHCP) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "minHCP": {$set: minHCP}
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setMaxHCP(bidNodeId, ruleId, maxHCP) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "maxHCP": {$set: maxHCP}
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setMinC(bidNodeId, ruleId, minC) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "minC": {$set: minC}
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setMaxC(bidNodeId, ruleId, maxC) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "maxC": {$set: maxC}
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setMinD(bidNodeId, ruleId, minD) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "minD": {$set: minD}
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setMaxD(bidNodeId, ruleId, maxD) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "maxD": {$set: maxD}
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setMinH(bidNodeId, ruleId, minH) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "minH": {$set: minH}
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setMaxH(bidNodeId, ruleId, maxH) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "maxH": {$set: maxH}
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setMinS(bidNodeId, ruleId, minS) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "minS": {$set: minS}
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setMaxS(bidNodeId, ruleId, maxS) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "maxS": {$set: maxS}
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    deleteRule(bidNodeId, ruleId) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        $splice: [[ruleId, 1]]
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    addKeyCardGroup(bidNodeId, ruleId) {
        let _id = this.state.bidNodes[bidNodeId].rules[ruleId].keyCardGroups.length;
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "keyCardGroups": {
                                $push: [{
                                    id: _id,
                                    min: 0,
                                    max: 0,
                                    cards: []
                                }]
                            }
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setKeyCardGroupMin(bidNodeId, ruleId, keyCardGroupId, min) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "keyCardGroups": {
                                [keyCardGroupId]: {
                                    "min": {
                                        $set: min
                                    }
                                }
                            }
                        }
                    }
                }
            }
        );
        this.setState("bidNodes", bidNodes);
    }

    setKeyCardGroupMax(bidNodeId, ruleId, keyCardGroupId, max) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "keyCardGroups": {
                                [keyCardGroupId]: {
                                    "max": {
                                        $set: max
                                    }
                                }
                            }
                        }
                    }
                }
            }
        );
        this.setState("bidNodes", bidNodes);
    }

    deleteKeyCardGroup(bidNodeId, ruleId, keyCardGroupId) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "keyCardGroups": {$splice: [[keyCardGroupId, 1]]}
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    addCard(bidNodeId, ruleId, keyCardGroupId) {
        let _id = this.state.bidNodes[bidNodeId].rules[ruleId].keyCardGroups[keyCardGroupId].cards.length;
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "keyCardGroups": {
                                [keyCardGroupId]: {
                                    "cards": {
                                        $push: [{
                                            id: _id,
                                            suit: 0,
                                            rank: 0
                                        }]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setSuit(bidNodeId, ruleId, keyCardGroupId, cardId, suit) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "keyCardGroups": {
                                [keyCardGroupId]: {
                                    "cards": {
                                        [cardId]: {
                                            "suit": {$set: suit}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    setRank(bidNodeId, ruleId, keyCardGroupId, cardId, rank) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "keyCardGroups": {
                                [keyCardGroupId]: {
                                    "cards": {
                                        [cardId]: {
                                            "rank": {$set: rank}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    deleteCard(bidNodeId, ruleId, keyCardGroupId, cardId) {
        let bidNodes = update(
            this.state.bidNodes,
            {
                [bidNodeId]: {
                    "rules": {
                        [ruleId]: {
                            "keyCardGroups": {
                                [keyCardGroupId]: {
                                    "cards": {$splice: [[cardId, 1]]}
                                }
                            }
                        }
                    }
                }
            }
        );
        this.setState({"bidNodes": bidNodes});
    }

    getQueryString(data = {}) {
        return Object.entries(data)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    generateFlowchart() {
        let flowchart = document.querySelector(".flowchart");
        const data = this.state.bidNodes;
        axios.post(
                "http://localhost:5000/generate",
                data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
             .then(res => Mermaid.render("Output", res["data"], markup => flowchart.innerHTML = markup))
             .catch(err => console.log(err));
        this.setState({"jsonOutput": JSON.stringify(data)});
    }

    render() {
        return (
            <div>
                <Inputs 
                    bidNodes={this.state.bidNodes}
                    setBid={(bidNodeId, bid) => this.setBid(bidNodeId, bid)}
                    setDestination={(bidNodeId, ruleId, destination) => this.setDestination(bidNodeId, ruleId, destination)}
                    setMinTP={(bidNodeId, ruleId, minTP) => this.setMinTP(bidNodeId, ruleId, minTP)}
                    setMaxTP={(bidNodeId, ruleId, maxTP) => this.setMaxTP(bidNodeId, ruleId, maxTP)}
                    setMinHCP={(bidNodeId, ruleId, minHCP) => this.setMinHCP(bidNodeId, ruleId, minHCP)}
                    setMaxHCP={(bidNodeId, ruleId, maxHCP) => this.setMaxHCP(bidNodeId, ruleId, maxHCP)}
                    setMinC={(bidNodeId, ruleId, minC) => this.setMinC(bidNodeId, ruleId, minC)}
                    setMaxC={(bidNodeId, ruleId, maxC) => this.setMaxD(bidNodeId, ruleId, maxC)}
                    setMinD={(bidNodeId, ruleId, minD) => this.setMinD(bidNodeId, ruleId, minD)}
                    setMaxD={(bidNodeId, ruleId, maxD) => this.setMaxD(bidNodeId, ruleId, maxD)}
                    setMinH={(bidNodeId, ruleId, minH) => this.setMinH(bidNodeId, ruleId, minH)}
                    setMaxH={(bidNodeId, ruleId, maxH) => this.setMaxH(bidNodeId, ruleId, maxH)}
                    setMinS={(bidNodeId, ruleId, minS) => this.setMinS(bidNodeId, ruleId, minS)}
                    setMaxS={(bidNodeId, ruleId, maxS) => this.setMaxS(bidNodeId, ruleId, maxS)}
                    setRank={(bidNodeId, ruleId, keyCardGroupId, cardId, r) => this.setRank(bidNodeId, ruleId, keyCardGroupId, cardId, r)}
                    setSuit={(bidNodeId, ruleId, keyCardGroupId, cardId, s) => this.setSuit(bidNodeId, ruleId, keyCardGroupId, cardId, s)}
                    deleteCard={(bidNodeId, ruleId, keyCardGroupId, cardId) => this.deleteCard(bidNodeId, ruleId, keyCardGroupId, cardId)}
                    addCard={(bidNodeId, ruleId, keyCardGroupId) => this.addCard(bidNodeId, ruleId, keyCardGroupId)}
                    setKeyCardGroupMin={(bidNodeId, ruleId, keyCardGroupId, m) => this.setKeyCardGroupMin(bidNodeId, ruleId, keyCardGroupId, m)}
                    setKeyCardGroupMax={(bidNodeId, ruleId, keyCardGroupId, m) => this.setKeyCardGroupMax(bidNodeId, ruleId, keyCardGroupId, m)}
                    deleteKeyCardGroup={(bidNodeId, ruleId, keyCardGroupId) => this.deleteKeyCardGroup(bidNodeId, ruleId, keyCardGroupId)}
                    addKeyCardGroup={(bidNodeId, ruleId) => this.addKeyCardGroup(bidNodeId, ruleId)}
                    deleteRule={(bidNodeId, ruleId) => this.deleteRule(bidNodeId, ruleId)}
                    addRule={bidNodeId => this.addRule(bidNodeId)}
                    deleteBidNode={this.deleteBidNode}
                    addBidNode={this.addBidNode}
                    generateFlowchart={this.generateFlowchart}
                />
                <JsonOutput jsonOutput={this.state.jsonOutput} />
                <div className="flowchart"/>
            </div>
        )
    }
}

ReactDOM.render(
    <FlowchartManager />,
    document.getElementById('root')
);

Mermaid.initialize({startOnLoad: true});
