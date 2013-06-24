<div class="j-slider"></div>
<div class="j-scale-code b-scale-code">
    <ul>
    <% _.each(dateScale.getAvailableScales(), function(code) { %>
    <li class="j-code-value <%if(code == dateScale.getScaleCode()) {%>b-selected<%}%>" data-code="<%=code%>"><%=code%></li>
    <% }) %>
    </ul>
</div>