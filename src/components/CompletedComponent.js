

export default function CompletedComponent({handleDeleteItem, handleDeleteAll,notes}) {
    return (
        <div className="CompletedComponent__notes">
                {notes.filter(task=>task.done === true).map(note=>(
                <div className="CompletedComponent__notes__note">
                    <div>
                        <input defaultChecked={note.done} type="checkbox"/>
                        <p>{note.content}</p>
                    </div>
                    <button onClick={()=>handleDeleteItem(note.content)}><i class="gg-trash-empty"></i></button>
                </div>))}
                <button onClick={handleDeleteAll}><i class="gg-trash-empty delete-all"></i>delete all</button>
        </div>
    )
}
