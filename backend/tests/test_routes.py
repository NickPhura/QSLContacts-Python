def test_health(client):
    response = client.get('/api/v1/health')
    assert response.data == b'"qsl-contacts-python server is running!"\n'
