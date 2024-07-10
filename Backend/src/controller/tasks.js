const getHome=(req,res)=>{
    res.send("Hi there")
}

async function fetchClass11Element(className) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
      const database = client.db("test");
      const collection = database.collection("Sidebar");
  
      // Query to find the document by its class name
      const query = { "class11.title1": className };
  
      // Projection to include only the class11 field
      const projection = { projection: { class11: 1 } };
  
      // Fetch the document
      const document = await collection.findOne(query, projection);
  
      if (document) {
        return document.class11;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching class11 element:', error);
    } finally {
      await client.close();
    }
  }

  
module.exports=getHome