# define useful values
from util import getDeclarer, getSuit


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
Level = 0
Suit = 1


class Auction:
    def __init__(self,dealer = North):
        self.minRemainingBids = 4
        self.dealer = dealer
        self.declarer = -1
        self.doubled = 0 #-2 = doubled; -4 = redoubled
        self.suit = NT
        self.level = 0
        self.bids = [] #store all bids made, starting with declarer
        self.complete = False

    #return success = True
    def nextBid(self,bid):
        if self.complete:
            print("you have attempted to enter a bid into a completed auction.")
            return False
        if not self.checkValid(bid):
            return False
        
        self.bids.append(bid)
        
        if bid ==(PS,PS):
            self.minRemainingBids -=1
            if self.minRemainingBids ==0:
                self.complete = True
            return True
        else:
            self.minRemainingBids = 3
        
        if bid[Level]>0:
            self.doubled = 0
            self.level = bid[Level]
            self.suit = bid[Suit]
            self.declarer = getDeclarer(self.bids,self.dealer)
        if bid == (X,X):
            self.doubled = X
        if bid == (XX,XX):
            self.doubled = XX
        
        
        
        

    def checkValid(self,bid):
        # define bids at tuples:
        # (level,suit)
        # special bids: (PS, PS)
        # special bids: (X , X )
        # special bids: (XX, XX)

        # pass always valid
        if bid == (PS,PS):
            return True

        auctionLength = len(self.bids)

        # verify doubles
        if bid == (X, X):
            if auctionLength<=1:
                return False
            if self.bids[auctionLength][Level] >=1 and self.bids[auctionLength][Suit]>=C:
                return True
            if auctionLength<=3:
                return False
            if self.bids[auctionLength] == (PS, PS) and self.bids[auctionLength-1] == (PS, PS) and self.bids[auctionLength-2][Level] >=1 and self.bids[auctionLength-2][Suit]>=C:
                return True
            return False

        # verify redoubles
        if bid == (XX, XX):
            if auctionLength<=1:
                return False
            if self.bids[auctionLength] == (X, X):
                return True
            if auctionLength<=3:
                return False
            if self.bids[auctionLength] == (PS, PS) and self.bids[auctionLength-1] == (PS, PS) and self.bids[auctionLength-2] == (X,X):
                return True
            return False
        
        #verify suit and level bids
        if bid[Level]>7 or bid[Suit]>NT or bid[Level]<1 or bid[Suit]<C:
            return False
        if bid[Level]>self.level or (bid[Suit]>self.suit and bid[Level]==self.level):
            return True
        
        return False

    def printAuction(self):
        i = 0
        print("North   East    South   West\n")
        if self.dealer == East:
            print("        ", end = '')
            i = 1
        if self.dealer == South:
            print("                ", end = '')
            i = 2
        if self.dealer == West:
            print("                        ", end = '')
            i = 3
        for bid in self.bids:
            level = ""
            if bid[Level]>=1:
                level = (str(bid[Level]))
            print((level+str(getSuit(bid[Suit])) +"\t").expandtabs(8),end='')
            i+=1
            if not i%4:
                print("\n")
        print("\n")

    
        
