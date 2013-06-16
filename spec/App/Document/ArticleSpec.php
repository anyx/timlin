<?php

namespace spec\App\Document;

use PHPSpec2\ObjectBehavior;

class Article extends ObjectBehavior
{
    function let()
    {
        $this->beConstructedWith('MyArticle');
    }
    
    function it_should_be_initializable()
    {
        $this->shouldHaveType('App\Document\Article');
    }
    
    function it_should_have_versions()
    {
        $this->getCountVersions()->shouldReturn(1);
    }
    
    function it_should_can_create_versions()
    {
        $this->createVersion();
        $this->getCountVersions()->shouldReturn(2);
    }
    
    function it_should_can_create_child_versions()
    {
        $currentVerision = $this->getCurrentVersion();
        $childVersion = $this->createChildVersion($currentVerision->getId());
        
        $childVersion->getParent()->getId()->shouldReturn($currentVerision->getId());
    }
}
