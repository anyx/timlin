<div class="b-dialog__content">
    
    <form action="" class="b-version-chooser">
        <label for="">Current version</label>
        <select name="version" class="j-version-select">
            <% var selectedVersion = !_.isNull(lastVersionId) ? lastVersionId : document.getCurrentVersionId(); %>
            <% _.each(document.getVersions(), function(version) { %>
            
            <option value="<%=version.id%>" <% if( selectedVersion == version.id) {%> selected <%}%> >
                    <%=version.getTitle()%>
            </option>
        <% }) %>
        </select>

        <div class="j-version-data"></div>
    </form>
</div>

<div class="b-dialog__buttons-panel">
    <input type="button" class="btn btn-small btn-danger j-remove-version-btn" disabled value="Remove version" />
    <input type="button" class="btn btn-small btn-inverse j-switch-version-btn" disabled value="Switch version" />
    <input type="button" class="btn btn-success btn-small j-save-version-btn" disabled value="Save"/>
    <input type="button" class="btn btn-small btn-primary j-create-version-btn" value="Create child version"/>
</div>