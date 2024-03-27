export default async function handler(req, res) {
    const { filename } = req.query;
  
    try {
      const response = await fetch(`http://2.250.10.1:21215/api/Media/getProfilePicture?filename=${filename}`, {
        method: 'GET',
        headers: {
          'Authorization': "Basic " + btoa(process.env.API_USERNAME + ':' + process.env.API_PASSWORD),
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  