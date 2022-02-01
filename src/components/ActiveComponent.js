
export default function AllComponent({contentNote,handleAddNote,handleTaskContent,handleIsDone,notes}){

    return (
        <div className="ActiveAndAllComponent">
            <form onSubmit={handleAddNote} className="ActiveAndAllComponent__add-notes">
                <input value={contentNote} onChange={handleTaskContent} placeholder="add details"/>
                <button>Add</button>
            </form>
            <div className="ActiveAndAllComponent__notes">
                {notes.filter(note=>note.done===false).map(note=>
                    <div className="ActiveAndAllComponent__notes__note">
                        <input value={note.content} onChange={handleIsDone} checked={note.done} type="checkbox"/>
                        <p>{note.content}</p>
                    </div>)
                }
            </div>
        </div>
    )
}