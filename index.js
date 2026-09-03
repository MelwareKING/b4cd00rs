module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { webhook, content } = req.body;

    if (!webhook || !content) {
        return res.status(400).send('Missing webhook or content');
    }

    try {
        const response = await fetch(webhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });

        res.status(response.status).send('OK');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};
