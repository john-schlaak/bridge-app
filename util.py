XX = -4 #redouble
X  = -2 #double
PS = -1 #pass
C  = 0
D  = 1
H  = 2
S  = 3
NT = 4
North = 0
South = 1
East = 2
West = 3
LEVEL = 0
SUIT = 1
import random
import copy

def cardToValue(card):
    if card == 14:
        return "A"
    elif card == 13:
        return "K"
    elif card == 12:
        return "Q"
    elif card == 11:
        return "J"
    elif card == 10:
        return "T"
    else:
        return str(card)

def sortDeal(deal):
    for i in range (0,4):
        deal["West"][i].sort(reverse = True)
        deal["South"][i].sort(reverse = True)
        deal["East"][i].sort(reverse = True)
        deal["North"][i].sort(reverse = True)

# Create function to generate reward table; 
# First Total points from contract and outcomes
# Then IMP estimate based on diff from 0 
# It will even out in the long run
def getTotalPointsNS(deal,auction):
    #determine whether vulnerable scoring applies
    vul = deal.vul
    ddTable = deal.ddTable
    level = auction.level
    suit = auction.suit
    doubled = auction.doubled
    declarer = auction.declarer

    if declarer == -1:
        return 0

    declarerVul = 0
    if vul == "All":
        declarerVul = 1
    elif (vul == "NS" and declarer <=South):
        declarerVul = 1
    elif (vul == "EW" and declarer >=East):
        declarerVul = 1
    sign = 1
    if declarer>=East:
        sign = -1

    tricksTaken = ddTable[declarer][4-suit]
    
    if (tricksTaken<(level+6)):
        down = (level+6)-tricksTaken
        if (not doubled):
            return (-50*down - 50*down*declarerVul)*sign
        elif (doubled <= X):
            if down == 1:
                return (50*doubled +50*doubled*declarerVul)*sign
            if down == 2 and not declarerVul:
                return (150*doubled)*sign
            if declarerVul:
                down +=1 #down 3X non-vul = down 2X vul, and 300 points for every subsequent trick, regardless of vulnerability
            return (250*doubled+150*doubled*(down-3))*sign
        else:
            print("contract down with invalid parameters. returning -1")
            return -1

    # determine slam bonus
    SGBonus = 0 #slam or game bonus
    if (level == 7):
        SGBonus = 3
    elif (level == 6):
        SGBonus = 2
    elif (level == 5):
        SGBonus = 1
    elif (level == 4 and suit >=H):
        SGBonus = 1
    elif (level == 3 and suit ==NT):
        SGBonus = 1
    elif (doubled == X and (level>=3 or (suit>=H and level>=2))):
        SGBonus = 1
    elif (doubled == XX and (level>=2 or (suit>=H and level>=1))):
        SGBonus = 1
    contractBonus = 50
    if SGBonus == 1:
        contractBonus = 300+200*declarerVul
    if SGBonus == 2:
        contractBonus = 800+450*declarerVul
    if SGBonus == 3:
        contractBonus = 1300+700*declarerVul
    # trick bonus, and then overtrick bonus.  don't forget insult points

    trickBonus = 20
    if (not doubled):
        tval = 20
        if suit>=H:
            tval+=10
        trickBonus = (tricksTaken-6)*tval
        if suit == NT:
            trickBonus+=10
    if doubled:#deal with both tricks and overtricks
        ovt = (tricksTaken-6)-level
        tval = -20*doubled
        if suit>=H:
            tval-=10*doubled
        trickBonus = tval*level+-50*doubled*ovt -25*doubled
        if suit == NT:
            trickBonus-=10*doubled
        if declarerVul:
            trickBonus = 2*trickBonus
    

    return (trickBonus+contractBonus)*sign

    

def getTotalPointsEW(deal,auction):
    return -1*getTotalPointsNS(deal,auction)



def getIMPComparison(usTP, themTP = 0):
    dif = usTP - themTP
    sign = 1
    if dif<0:
        sign = -1
    mag = abs(dif)
    val = 0
    #increment along discretized logarithmic scale, cap at 24 
    if mag>15:
        val+=1
    if mag>45:
        val+=1
    if mag>85:
        val+=1
    if mag>125:
        val+=1
    if mag>165:
        val+=1
    if mag>215:
        val+=1
    if mag>265:
        val+=1
    if mag>315:
        val+=1
    if mag>365:
        val+=1
    if mag>425:
        val+=1
    if mag>495:
        val+=1
    if mag>595:
        val+=1
    if mag>745:
        val+=1
    if mag>895:
        val+=1
    if mag>1095:
        val+=1
    if mag>1295:
        val+=1
    if mag>1495:
        val+=1
    if mag>1745:
        val+=1
    if mag>1995:
        val+=1
    if mag>2245:
        val+=1
    if mag>2495:
        val+=1
    if mag>2995:
        val+=1
    if mag>3495:
        val+=1
    if mag>3995:
        val+=1
    
    return sign*val #todo method stub

def getHighCardPoints(hand):
    #todo: return high card points from a single hand
    runningTotal = 0
    for suit in hand:
        for card in suit:
            if card>10:
                runningTotal+= card-10
    return runningTotal

def getTotalPointsLength(hand) #counts length points for suits 4 cards or longer
    runningTotal = 0
    for suit in hand:
        tick = 0
        for card in suit:
            tick+=1
            if card>10:
                runningTotal+= card-10
        if tick>3:
            runningTotal+=tick-3
    return runningTotal

#return -1 if no current declarer
#return direction of hypothetical declarer should auction end in passes
def getDeclarer(bidsList, dealer):
    #todo: determine declarer
    i = len(bidsList)
    suit = -1
    while i>0:
        i-=1
        if bidsList[i][1]>=C:
            suit = bidsList[i][SUIT]
            i = 0 #break
    if suit == -1:
        return -1 #no declarer found
    trace = dealer
    for bid in bidsList:
        if bid[1]==suit:
            return trace
        trace = nextPlayer(trace)
    print("Something went wrong")
    return -2

def nextPlayer(currentDirection):
    if currentDirection == North:
        return East
    if currentDirection == East:
        return South
    if currentDirection == South:
        return West
    if currentDirection == West:
        return North

def getSnoopSuit(hand1, hand2):
    comblen = 0
    suit = -1

    #majors; if one if found, ignore minors
    for i in range(0,2):
        templen = len(hand1[i])+len(hand2[i])
        if templen>comblen:
            suit = i
            comblen = templen
    if comblen>=8:
        return 3-suit

    #minors; if one is found return it.
    for i in range(2,4):
        templen = len(hand1[i])+len(hand2[i])
        if templen>comblen:
            suit = i
            comblen = templen
    if comblen>=8:
        return 3-suit

    #else return NT
    return NT

def getSuit(suit):
    if suit == C:
        return "C"
    if suit == D:
        return "D"
    if suit == H:
        return "H"
    if suit == S:
        return "S"
    if suit == NT:
        return "NT"
    if suit == PS:
        return "Pass"

def NNInput(hand):
    # one hot hands
    hands = [0] * (52*4)
    for i in range (0,52):
        add = ((i//13) *52) -1 #adjust because the first card in the deck is "1"
        hands[hand.deck[i]+add] = 1
    # print(hands)
    
    #dd table values, appended to the same vector
    for something in hand.ddTable:
        for i in range(0,5):
            hands.append(something[i])
    return hands

def NNInputFull(MC,auction):
    vec = copy.deepcopy(auction)
    for deal in MC:
        temp = NNInput(deal)
        for item in temp:
            vec.append(item)
    return vec




