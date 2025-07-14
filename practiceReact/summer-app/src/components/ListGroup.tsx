function ListGroup() {
    const items = [
        'New york',
        'London',
        'Paris',    
        'Tokyo',
    ];
    items.map(item => (
        <li className="list-group-item">{item}</li>
    ));
    return (
        <div>
            {items.length ===0 ? (
                <>
                    <h1>Lists</h1>
                    <p>No items found</p>
                </>
            ) : (
                <h1>List</h1>
            )}
            <ul className="list-group">
                {items.map(item => (
                    <li key ={item}className="list-group-item">{item}</li>
                ))}
                <li className="list-group-item">this is us</li>
                <li className="list-group-item">this is them</li>
            </ul>
        </div>
    );
}

export default ListGroup;
