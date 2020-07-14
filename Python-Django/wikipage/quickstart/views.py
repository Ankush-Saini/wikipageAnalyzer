from django.shortcuts import render
from rest_framework.response import Response
# Create your views here.

from rest_framework import viewsets
from wikipage.quickstart.serializers import Task1Serializer,Task2Serializer
from wikipage.tasks.Task1 import Task1
from wikipage.tasks.Task2 import Task2
from collections import OrderedDict
# Import libraries
import pandas as pd
import os
import json
import matplotlib.pyplot as plt
import numpy as np
from datetime import datetime
from future.utils import iteritems 
from collections import Counter

class Task1ViewSet(viewsets.ViewSet):
    # Required for the Browsable API renderer to have a nice form.
    serializer_class = Task1Serializer
    
    def getDFforYearRange(self,start,end,df):
        df['Year'] = df.apply(lambda row: datetime.strptime(row['time_published'],'%Y-%m-%dT%H:%M:%SZ').year,axis=1) 
        plotDF = df[(df['Year']>=start) & (df['Year']<=end)]
        plotDF=plotDF
        plotDF = plotDF.groupby('Year')['title'].count()
        return plotDF

    def fetchValues(self,start,end):
        df_rows = []
        folder = os.fsencode('/Users/ankussai/Documents/Study Material/Python & Data Science Bootcamp/Sandbox/wikipage/content/wikipages/')
        for file in os.listdir(folder):
            filename = os.fsdecode(file)
            if filename.endswith('.json'):
                filename = os.fsdecode(folder)+filename
                with open(os.fsdecode(filename), mode='r') as json_file:
                    data = json.load(json_file)
                    df_rows.append(data)
        newDF = pd.DataFrame(df_rows)
        result=self.getDFforYearRange(start,end,newDF)
        tasks={}
        for ind in result.index: 
            tasks[ind]=(Task1(year=ind,count=result[ind]))
        # return {
        #     "items": [
        #         { "id": 1, "name": "Apples",  "price": "$2" },
        #         { "id": 2, "name": "Peaches", "price": "$5" }
        #     ] 
        # }
        return tasks

    def list(self, request):
        start = int(request.GET['start'])
        end = int(request.GET['end'])
        print(start+end)
        tasks={}
        tasks = self.fetchValues(start,end)
        serializer = Task1Serializer(instance=tasks.values(), context={'request': request}, many=True)
        return Response(serializer.data)   



class Task2ViewSet(viewsets.ViewSet):
    # Required for the Browsable API renderer to have a nice form.
    serializer_class = Task2Serializer

    def fetchValues(self):
        df_rows = []
        folder = os.fsencode('/Users/ankussai/Documents/Study Material/Python & Data Science Bootcamp/Sandbox/wikipage/content/wikipages/')
        for file in os.listdir(folder):
            filename = os.fsdecode(file)
            if filename.endswith('.json'):
                filename = os.fsdecode(folder)+filename
                with open(os.fsdecode(filename), mode='r') as json_file:
                    data = json.load(json_file)
                    df_rows.append(data)
        newDF = pd.DataFrame(df_rows)
        names=[]
        coun=[]
        for index,value in iteritems(newDF['sections'].to_dict()):
            sectionSet=set()
            for i in value:
                for name in i['attributes']:
                    names.append(name['name'].strip())
                    sectionSet.add(name['name'].strip())
            coun.extend(list(sectionSet))   
        uniqueElem=set()
        for elem in Counter(coun):
            uniqueElem.add(elem)

        elems=[]
        length=[]
        width=[]
        tasks= OrderedDict() 
        ind=0
        for elem in sorted(uniqueElem):
            print(elem,Counter(coun)[elem],Counter(names)[elem])
            # elems.append(elem)
            # length.append(Counter(coun)[elem])
            # width.append(Counter(names)[elem]) 
            if(Counter(coun)[elem] in tasks):
                keyTotal=tasks[Counter(coun)[elem]].totalPerSection+Counter(names)[elem]
                tasks[Counter(coun)[elem]]=Task2(name=elem,total=keyTotal,totalPerSection=Counter(coun)[elem])
            else:         
                tasks[Counter(coun)[elem]]=Task2(name=elem,total=Counter(names)[elem],totalPerSection=Counter(coun)[elem])
            # ind+=1
            # if(ind==20):
            #     break
      
        return dict(sorted(tasks.items()))

    def list(self, request):
        # start = request.GET['start']
        # end = request.GET['end']
        tasks={}
        tasks = self.fetchValues()
        serializer = Task2Serializer(instance=tasks.values(), context={'request': request}, many=True)
        return Response(serializer.data)          