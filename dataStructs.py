from auction import Auction
class BidNode:

    def __init__(self,ID, bid,rulesDict,historiesDict):
        #histories are valid auctions that reach this bid, along with their implications?
        self.ID = ID
        self.bid = bid
        self.rules = []
        for rule in rulesDict:
            self.rules.append(Rule(rule))
        self.histories = []
        for hist in historiesDict:
            self.histories.append(History(hist))
        
        #nexts are a set of rules for selecting a next bid based on some criterion provided and history.
        # these are passed in the form of the rules dict which contains a list of rules.  each rule has a set of constraints


class Rule:

    def __init__(self,constraints):
        self.establishRules(constraints)
    
    def establishRules(self,constraints):
        self.HCPMax = min(37,constraints["HCPMax"])
        self.HCPMin = max(0,constraints["HCPMin"])
        self.TPMax = min(37,constraints["TPMax"])
        self.TPMin = max(0,constraints["TPMin"])
        self.keycards = constraints["keycards"] #set of sets — sets can be of size one card, or size many.  Specifies suit and rank
        self.kcMins = constraints["keycardMinimums"]

class History:
    PASS = -1
    def __init__(self,route):
        self.establishAuction(route)

    def establishAuction(self,route:
        self.auction = Auction()
        for bid in option:
            auction.nextBid(bid) #bid is a tuple representing (level, suit) or (Pass, Pass) (or DBL DBL but this is irrelevant for passive agents)
            auction.nextBid((PASS,PASS)) #playing against passive opponents

