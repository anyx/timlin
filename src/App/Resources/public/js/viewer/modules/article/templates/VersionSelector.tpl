<select name="" id="">
<%_.each(document.getVersions(), function(version) { %>
<% console.log(version) %>
<option><%=version%></option>
<% }) %>
</select>