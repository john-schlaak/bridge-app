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
        
        # self.rules is a set of rules for selecting a next bid based on some criterion provided and history however "history" is a somewhat intrinsic property to the bid ID
        # these are passed in the form of the rules dict which contains a list of rules.  each rule has a set of constraints
        
    def outputMermaid(self):
        pass
        # todo: output the mermaid syntax surrounding this node.  alternatively, create another datastructure, i.e. a graph data structure
        # this would consist of BidNodes, each of which would have multiple rules (which are edges) pointing to bidNodes with higher bids (and higher bid ID's)
        # the histories are an intrinsic property.  that is to say, the histories are all the possible back traversals along the tree to the root node
        # this gives us:
        #   a tree with many nodes each with a distinct ID, some may have identical bids (but different meanings);
        #   a list of edges going from each node to other nodes, I.e rules, and multiple rules can point to the same node, but rules are never circular; the tree traverses downward, though nodes can be skipped and there can be multiple nodes (with different id's) at the same bid level.  there are 35 bids so the max depth of the tree is 35 but thats somewhat unlikely.  basically ignore this for now, and I'm not sure why you scrolled all the way over here, who writes obnoxiously long comments like this?
        #   this then has to be parsed into mermaid input

class Rule:

    def __init__(self,constraints):
        self.establishRules(constraints)
    
    def establishRules(self,constraints):
        self.HCPMax = min(37,constraints["HCPMax"])
        self.HCPMin = max(0,constraints["HCPMin"])
        self.TPMax = min(37,constraints["TPMax"])
        self.TPMin = max(0,constraints["TPMin"])
        self.keycards = constraints["keycards"] #set of sets — sets can be of size one card, or size many.  Specifies suit and rank
        self.kcMins = constraints["keycardMinimums"] #minimum number of key cards from each set necessary to be consistent with the bid this rule points to

class History:
    PASS = -1 #holdover from the rest of the codebase
    def __init__(self,route):
        self.establishAuction(route)

    def establishAuction(self,route):
        self.auction = Auction()
        for bid in route:
            auction.nextBid(bid) #bid is a tuple representing (level, suit) or (Pass, Pass) (or DBL DBL but this is irrelevant for our purposes against passive agents in flow chart form)
            auction.nextBid((PASS,PASS)) #playing against passive opponents


