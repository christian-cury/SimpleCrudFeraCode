import axios from 'axios';

const url = 'api/posts';

class PostService {
    
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date()
                    }))
                );
            } catch(err) {
                reject(err)
            }
        })
    }
}

export default PostService;