<form action="" class="b-document-form">
    <% var currentVersion = document.getCurrentVersion(); %>
    <label for="">Version</label>
    <span>
        <% if (currentVersion.isPublished()) { %>
        <i class="icon-circle text-success" title="Published"></i> 
        <% } else { %>
        <i class="icon-circle-blank text" title="Unpublished"></i> 
        <% } %>
        <%=currentVersion.getTitle()%>
    </span>
    <a href="#" class="j-choose-version-button">
        <i class="icon-edit"></i>
    </a>
    <label for="">Title</label>
    <input type="text" class="j-document-title" value="<%=document.getTitle()%>" />
    <label for="">Description</label>
    <textarea cols="30" rows="10" class="j-document-description"><%=document.getDescription()%></textarea>

    <input type="button" class="j-save-document-button" value="Save"/>
    <% if (!document.isPublished()) { %>
    <input type="button" class="btn-primary j-publish-document-button" data-value="true" value="Publish"/>
    <% } else { %>
    <input type="button" class="btn-inverse j-publish-document-button" data-value="false" value="Unpublish"/>
    <% } %>
</form>