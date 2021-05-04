from neo4j import GraphDatabase
import sys
import csv


def f(x):
    r=[]
    if x is None:
        return None
    for yy in x[1:-1].split(", "):
        #for z in yy:
            #if z=='' or z==" ":
                #continue
        tmp=yy.replace("'",'').replace(']','').replace('[','')
        try:
            tmp=int(tmp)
            print(x,tmp)
        except:
            pass
        r+=[tmp]
    return r


if __name__ == "__main__":
        d = dict()        
        with open(sys.argv[1], 'r', newline='') as csvfile:
            reader = csv.reader(csvfile,delimiter=";",quotechar='"', quoting=csv.QUOTE_MINIMAL)
            for x in reader:
                d[x[0]+";"+x[1]+";"+x[2]] = x[3:]

        with open(0, 'r',newline='') as csvfile:
            reader = csv.reader(csvfile,delimiter=";",quotechar='"', quoting=csv.QUOTE_MINIMAL)
            #writer.writerow(result.keys())
            rr = []
            lr = [[[],0,0,0,0],[[],0,0,0,0]]
            for x in reader:
                r = 0
                for y in csv.reader(x[-1][1:-1], delimiter=','):
                    for z in y:
                        if z=='' or z==" ":
                            continue
                        r+=int(z)
                c=[]
                for yy in csv.reader(x[1][1:-1], delimiter=',',quotechar="'"):
                    for z in yy:
                        if z=='' or z==" ":
                            continue
                        c.append(z)
                b=d.get(x[0]+";"+c[0]+";"+x[2])
                a=d.get(x[0]+";"+c[-2]+";"+x[2])
                #print(x[0],x[2],c[0],c[-2],r)
                if b is None and a is None:
                    continue

                aa = None if a is None else [f(x) for x in a]
                bb = None if b is None else [f(x) for x in b]

                while len(rr)<r+1:
                    rr.append([[],0,0,0,0,0])

                if bb is not None:
                    print(bb)
                    for i in range(len(bb[0])):
                        print(r,bb[0][i],b[1][i],bb[2][i],bb[3][i])

                    lr[0][0]+=bb[0]
                    lr[0][1]+=sum(bb[1])
                    lr[0][2]+=sum(bb[2])
                    lr[0][3]+=sum([1 for x in bb[3] if x=='True'])
                    lr[0][4]+=sum([1 for x in bb[3] if x=='False'])
                    
                    rr[r][0]+=bb[0]
                    rr[r][1]+=sum(bb[1])
                    rr[r][2]+=sum(bb[2])
                    rr[r][3]+=sum([1 for x in bb[3] if x=='True'])
                    rr[r][4]+=sum([1 for x in bb[3] if x=='False'])

                if aa is not None and False:
                    lr[1][0]+=aa[0]
                    lr[1][1]+=sum(aa[1])
                    lr[1][2]+=sum(aa[2])
                    lr[1][3]+=sum([1 for x in aa[3] if x=='True'])
                    lr[1][4]+=sum([1 for x in aa[3] if x=='False'])
                    
                    rr[r][0]+=aa[0]
                    rr[r][1]+=sum(aa[1])
                    rr[r][2]+=sum(aa[2])
                    rr[r][3]+=sum([1 for x in aa[3] if x=='True'])
                    rr[r][4]+=sum([1 for x in aa[3] if x=='False'])


            print(lr)
            print(rr)
