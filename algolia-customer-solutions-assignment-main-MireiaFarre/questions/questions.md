*Question 1*  

From: marissa@startup.com  
Subject:  Bad design  

Hello,  
  
Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.  
   
Thanks,  
Marissa  


*Answer Question 1*  


Hi Marissa,

Thank you for sharing your feedback with us. I understand that the recent changes to the dashboard may feel less convenient, especially when you’re in the middle of frequent iterations. While the dashboard design is standardised for all our customers and cannot be modified, I want to help ensure that your workflow is as smooth as possible.

One potential solution to streamline your process could be utilising our API or command-line tools for tasks like clearing and deleting indexes. This way, you can perform these actions more quickly without navigating through the dashboard. If you're unfamiliar with these tools, I’d be happy to provide you with some guidance or examples to get started.

Please let me know if this approach could work for you, or if there are other aspects of the dashboard that I can assist you with.

Thanks,
Mireia


  
--



*Question 2*:   
  
From: carrie@coffee.com  
Subject: URGENT ISSUE WITH PRODUCTION!!!!  
  
Since today 9:15am we have been seeing a lot of errors on our website. Multiple users have reported that they were unable to publish their feedbacks and that an alert box with "Record is too big, please contact enterprise@algolia.com".  
  
Our website is an imdb like website where users can post reviews of coffee shops online. Along with that we enrich every record with a lot of metadata that is not for search. I am already a paying customer of your service, what else do you need to make your search work?  
  
Please advise on how to fix this. Thanks.   


*Answer Question 2*  


Hi Carrie,

Thank you for reaching out and for bringing this to our attention so quickly. I understand how critical this issue is for your website, and I’m here to help you resolve it as soon as possible.

The error message your users are encountering, “Record is too big, please contact enterprise@algolia.com,” indicates that some of your records are exceeding the size limit allowed by Algolia. Each record in Algolia has a maximum size limit of 10 KB to 20 KB for the Community and Essential plans, and up to 100 KB for the Pro and Enterprise plans.

Given that your website enriches records with a lot of metadata, it’s possible that the additional data is pushing the records over the limit. Here are a few steps you can take to address this issue:

-> Optimise Record Size: Review the metadata being added to each record. If some of the data is not essential for search, you might consider storing it outside of Algolia and only keeping the most relevant information within the records.

-> Use Object IDs: Instead of storing all metadata within the record, you could store just an identifier (e.g., an object ID) in Algolia and fetch the additional metadata from your database or another source as needed.

-> Enterprise Plan Consideration: If the metadata is crucial and needs to be part of each record, upgrading to an Enterprise plan, which offers a larger record size limit, might be a solution. This could be especially useful given the nature of your website and the amount of data each review might include.

-> Indexing Strategies: Consider breaking down your data into smaller, linked records or using Algolia’s hierarchical or multi-indexing strategies to distribute the data more efficiently.

I’d be happy to discuss these options further and work with you to find the best solution. If you’d like, we can also arrange a call to go through your specific setup and make the necessary adjustments to prevent this issue in the future.

Please let me know how you’d like to proceed, and I’ll be ready to assist.

Thanks,
Mireia



--



*Question 3*:   

From: marc@hotmail.com  
Subject: Error on website  
  
Hi, my website is not working and here's the error:  
  
![error message](./error.png)  
  
Can you fix it please?  


*Answer Question 3*  


Hi Marc,

Thank you for reaching out and sharing the error message with me.

The error message "Uncaught ReferenceError: searchkit is not defined" suggests that the 'searchkit' library or module is either not correctly imported or is unavailable in the context where it’s being called.

To quickly resolve this, here are a few straightforward steps you can take:

1. Check Installation: Ensure that 'searchkit' is installed by running the below through the terminal:

            npm ls searchkit
            or
            yarn list searchkit

If it shows it is not installed, simply run:

            npm install searchkit
            or
            yarn add searchkit

2. Verify Import Statement: Make sure that 'searchkit' is correctly imported in your code with:

            import Searchkit from 'searchkit';

If 'searchkit' is expected to be a global variable, ensure that the script loading 'searchkit' runs before any scripts that rely on it.

If these steps don’t resolve the issue, please let me know. I’d be happy to help further—perhaps a quick call or screen-sharing session might help us identify the problem more quickly.

Thanks,
Mireia