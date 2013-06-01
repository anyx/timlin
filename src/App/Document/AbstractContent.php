<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use JMS\Serializer\Annotation as Serializer;

/**
 * @MongoDB\MappedSuperclass
 */
abstract class AbstractContent
{
    /**
     * @MongoDB\Id
     * @Serializer\Groups({"Editor"})
     */
    protected $id;

    /**
     * @MongoDB\ReferenceOne(targetDocument="AbstractDocument")
     * @Serializer\Groups({"Editor"})
     */
    protected $parent;

    /**
     * @MongoDB\String
     * @Serializer\Groups({"Editor"})
     */
    protected $title;

    /**
     * @MongoDB\Boolean
     * @Serializer\Groups({"Editor"})
     */
    public $published = false;

    /**
     * @MongoDB\Date
     * @Serializer\Groups({"Editor"})
     * @Serializer\Type("DateTime")
     */
    protected $createdAt;
    
    /**
     * @MongoDB\Date
     * @Serializer\Groups({"Editor"})
     */
    protected $updatedAt;

    /**
     * 
     * @param \App\Document\AbstractContent $parent
     */
    public function __construct(AbstractContent $parent = null)
    {
        $this->id = new \MongoId();
        if (!empty($parent)) {
            $this->parent = $parent;
        }
    }

    /**
     * 
     * @return \App\Document\AbstractContent
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * 
     * @param \App\Document\AbstractContent $parent
     */
    public function setParent(AbstractContent $parent)
    {
        $this->parent = $parent;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }
    
    public function isPublished()
    {
        return $this->published;
    }

    public function publish()
    {
        $this->published = true;
    }

    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * @MongoDB\PrePersist
     */
    public function OnPersistSetCreatedAt()
    {
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }

    /**
     * @MongoDB\PreUpdate
     */
    public function OnUpdateUpdatedAt()
    {
        $this->updatedAt = new \DateTime();
    }
}
