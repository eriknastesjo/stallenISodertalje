# Ställen i Södertälje

This is open source code for an application built in React Native. The application uses API:s to fetch position data in Södertälje Sweden. 

## How it works (roughly)

In components/RootMenu and Components/Flow you will find the most important lines of code. It starts with the array declared in components/RootMenu/Categories.tsx. The information in this array will control which API:s are used and ergo which places are enabled by the rest of the code in /RootMenu and /Flow. 

In models/sodertalje.ts you will find a couple of simple methods responsible for fetching position data from Södertäljes API:s. 
